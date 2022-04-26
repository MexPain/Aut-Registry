package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import hu.bme.aut.registrybackend.payloads.response.ProfileResponse
import hu.bme.aut.registrybackend.repositories.ItemLendingRepository
import hu.bme.aut.registrybackend.repositories.item.ItemRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.services.FileStorageService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userRepository: UserRepository,
    private val itemRepository: ItemRepository,
    private val itemLendingRepository: ItemLendingRepository,
) {


    @GetMapping("/profile")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")  //ez nem kell ha mind3 lehet, csak ha kevesebb
    fun getUserProfile() : ResponseEntity<Any> {
        val user: User = SecurityContextHolder.getContext().authentication.principal as User
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        return ResponseEntity.ok(
            ProfileResponse(
                userData.username, userData.email,
                userData.firstname, userData.lastname,
                userData.description, userData.phone,
                userData.image?.let { "/files/${it.id}" },
                )
        )
    }

    @PostMapping("/lend/{itemId}")
    fun lendItemToCurrentUser(@PathVariable itemId: Long): ResponseEntity<Any> {
        val item = itemRepository.findById(itemId).get()
        val user = SecurityContextHolder.getContext().authentication.principal as User
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        val newItemLending = ItemLending(
            item = item,
            user = userData,
            Date(),
            Date((Date()).time + 18_000_000L),
            ItemLendingKey(item.id, userData.id)
        )
        itemLendingRepository.save(newItemLending)
        userData.borrowedItems.add(newItemLending)
        val savedData = userRepository.save(userData)
                    item.borrowedBy.add(newItemLending)
                    itemRepository.save(item)
        return ResponseEntity.ok(
            savedData
        )
    }
}