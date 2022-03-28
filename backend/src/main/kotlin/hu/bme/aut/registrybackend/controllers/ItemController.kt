package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.Item
import hu.bme.aut.registrybackend.payloads.request.NewItemRequest
import hu.bme.aut.registrybackend.repositories.ItemRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/items")
class ItemController(
    private val itemRepository: ItemRepository
) {

    @GetMapping("/all")
    fun getAllItems() : ResponseEntity<Any> {
        val items = itemRepository.findAll()
        return ResponseEntity.ok(items)
    }

    @GetMapping("/borrowed")
    fun getItemsBorrowedByUser(@RequestParam username: String): ResponseEntity<Any> {
        //TODO
        return ResponseEntity.badRequest().body("Not yet implemented")
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    fun addNewItem(@RequestBody item: NewItemRequest): ResponseEntity<Any> {
        val newItem = itemRepository.save(Item(
            name = item.name,
            created = Date(),
            description = item.description
        ))
        return ResponseEntity.ok(
            newItem
        )
    }

}