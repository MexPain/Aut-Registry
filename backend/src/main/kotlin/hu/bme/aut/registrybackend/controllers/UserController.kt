package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.Lending.EStatus
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import hu.bme.aut.registrybackend.entities.Lending.Status
import hu.bme.aut.registrybackend.entities.Role
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.payloads.request.RoleChangeRequest
import hu.bme.aut.registrybackend.payloads.response.BorrowedItemResponse
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.payloads.response.ProfileResponse
import hu.bme.aut.registrybackend.repositories.ItemLendingRepository
import hu.bme.aut.registrybackend.repositories.RoleRepository
import hu.bme.aut.registrybackend.repositories.StatusRepository
import hu.bme.aut.registrybackend.repositories.item.ItemRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.security.services.RefreshTokenService
import hu.bme.aut.registrybackend.security.services.UserDetailsImpl
import hu.bme.aut.registrybackend.services.ItemService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.util.*
import kotlin.NoSuchElementException
import kotlin.streams.toList

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userRepository: UserRepository,
    private val itemRepository: ItemRepository,
    private val itemLendingRepository: ItemLendingRepository,
    private val statusRepository: StatusRepository,
    private val roleRepository: RoleRepository,
    private val refreshTokenService: RefreshTokenService,
    private val itemService: ItemService,
) {


    @GetMapping("/profile")
    fun getUserProfile() : ResponseEntity<Any> {
        val user: UserDetailsImpl = SecurityContextHolder.getContext().authentication.principal as UserDetailsImpl
        val userData = userRepository.findByUsername(user.username) //TODO fölösleges
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        return ResponseEntity.ok(
            ProfileResponse(
                userData.username, userData.email,
                userData.firstname, userData.lastname,
                userData.description, userData.phone,
                userData.image?.let { "/files/${it.id}" },
                userData.roles.stream()
                .map { it.name!!.name }.toList(),
                userData.borrowedItems,
                )
        )
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun getAllUsers() : ResponseEntity<List<User>> {
        val users = userRepository.findAll()
        return ResponseEntity.ok(users)
    }

    @PostMapping("/lend/{itemId}")
    fun lendItemToCurrentUser(@PathVariable itemId: Long): ResponseEntity<Any> {
        val item = itemRepository.findById(itemId).get()
        val user = SecurityContextHolder.getContext().authentication.principal as UserDetailsImpl
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")
        if(itemLendingRepository.isItemWithIdBorrowed(itemId)) {
            return ResponseEntity.badRequest().body(
                MessageResponse("Item is already borrowed")
            )
        }
        var isMod = false
        userData.roles.forEach {
            if(it.name == ERole.ROLE_MODERATOR) isMod = true
        }
        val status = (if(isMod) statusRepository.findByName(EStatus.STATUS_ACCEPTED) else statusRepository.findByName(EStatus.STATUS_PENDING))
            ?: return ResponseEntity.status(500).body(
                MessageResponse("Status was not found in the database")
            )  //mods dont need approval

        val newItemLending = ItemLending(
            item = item,
            user = userData,
            Date(),
            status,
            ItemLendingKey(item.id, userData.id)
        )
        itemLendingRepository.save(newItemLending)

        val savedData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")
//        userData.borrowedItems.add(newItemLending)
//        val savedData = userRepository.save(userData)
//
//        item.borrowedBy = newItemLending
//        itemRepository.save(item)

        return ResponseEntity.ok(
            savedData
        )
    }

    @GetMapping("/borrowedItems")
    fun getBorrowedItemsOfUser(): ResponseEntity<Any> {
        val user: UserDetailsImpl = SecurityContextHolder.getContext().authentication.principal as UserDetailsImpl
        val userData = userRepository.findById(user.id)
        val items = userData.map { it.borrowedItems }.get()
        if(items.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                MessageResponse("The user has not borrowed any items")
            )
        return ResponseEntity.ok(items.map {
            BorrowedItemResponse(
                it.item.id!!,
                it.user.id!!,
                it.item.name,
                it.user.username,
                it.lentAt,
                it.status!!.name.name
            )
        })
    }

    @PutMapping("/update/roles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun changeUserRoles(@RequestParam id: Long, @RequestBody data: RoleChangeRequest): ResponseEntity<Any> {
        try {
            if(data.newRoles.isEmpty()) return ResponseEntity.badRequest().body(
                MessageResponse("No roles provided")
            )
            val user = userRepository.findById(id).get()
            val roles: MutableSet<Role> = hashSetOf()
            data.newRoles.forEach {
                when(it) {
                    "ROLE_ADMIN"-> {
                        val adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(adminRole)
                    }
                    "ROLE_MODERATOR" -> {
                        val modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(modRole)
                    }
                    else -> {
                        val userRole = roleRepository.findByName(ERole.ROLE_USER)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(userRole)
                    }
                }
            }
            user.roles = roles
            val updatedUser = userRepository.save(user)
            return ResponseEntity.ok(updatedUser)

        }catch (e: NoSuchElementException) { return ResponseEntity.badRequest().body(
            MessageResponse("User does not exists")
        )}
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun deleteUser(@PathVariable id: Long): ResponseEntity<Any> {
        return try {
            deleteEverythingForUser(id)
            ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                MessageResponse("User deleted"))
        }catch (e: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                MessageResponse("Failed to delete user"))
        }
    }

    @Transactional
    fun deleteEverythingForUser(id: Long) {
        var user = userRepository.findById(id).get()
        val refTokens = refreshTokenService.deleteAllByUser(user)

        itemService.deleteItemLendingsByUserId(id)
        userRepository.save(user)
        userRepository.delete(user)
    }
}