package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.Lending.EStatus
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import hu.bme.aut.registrybackend.entities.Lending.Status
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.payloads.response.ProfileResponse
import hu.bme.aut.registrybackend.repositories.ItemLendingRepository
import hu.bme.aut.registrybackend.repositories.StatusRepository
import hu.bme.aut.registrybackend.repositories.item.ItemRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.security.services.UserDetailsImpl
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import java.util.*
import kotlin.streams.toList

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userRepository: UserRepository,
    private val itemRepository: ItemRepository,
    private val itemLendingRepository: ItemLendingRepository,
    private val statusRepository: StatusRepository,
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
    @PreAuthorize("hasRole('ADMIN')")
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



        return ResponseEntity.ok(items)
    }
}