package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.Item.Category
import hu.bme.aut.registrybackend.entities.Item.SubCategory
import hu.bme.aut.registrybackend.payloads.request.itemRequests.NewCategoryRequest
import hu.bme.aut.registrybackend.payloads.request.itemRequests.NewItemRequest
import hu.bme.aut.registrybackend.payloads.request.itemRequests.NewSubCategoryRequest
import hu.bme.aut.registrybackend.payloads.response.BorrowedItemResponse
import hu.bme.aut.registrybackend.payloads.response.ErrorMessage
import hu.bme.aut.registrybackend.payloads.response.ItemResponse
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.repositories.item.CategoryRepository
import hu.bme.aut.registrybackend.repositories.item.SubCategoryRepository
import hu.bme.aut.registrybackend.services.ItemService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.*
import kotlin.NoSuchElementException

@RestController
@RequestMapping("/api/items")
class ItemController(
    private val itemService: ItemService,
    private val categoryRepository: CategoryRepository,
    private val subCategoryRepository: SubCategoryRepository,
) {

    @GetMapping("/all")
    fun getAllItems() : ResponseEntity<Any> {
        val items = itemService.findAllItems()
        return ResponseEntity.ok(
            items
        )
    }

    @GetMapping("/{id}")
    fun getItem(@PathVariable id: Long) : ResponseEntity<Any> {
        val result = itemService.findItem(id)
        return ResponseEntity.ok(result)
    }

    @GetMapping("/available")
    fun getNonBorrowedItems(): ResponseEntity<List<ItemResponse>> {
        val result = itemService.findAllNonBorrowedItems()
        val items: List<ItemResponse> = result.map {
            ItemResponse(it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
                "/files/${it.image.id}", it.description, it.borrowedBy)
        }

        return ResponseEntity.ok().body(items)
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    fun addNewItem(@RequestBody item: NewItemRequest): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(
                itemService.addNewItem(item)
            )
        }catch (e: NoSuchElementException) {
            ResponseEntity.badRequest().body(ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                Date(),
                e.message,
                ServletUriComponentsBuilder.fromCurrentContextPath().toUriString()
            ))
        }
    }

    @GetMapping("/borrowed/all")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    fun getAllBorrowedItems(): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(
                itemService.findAllAcceptedItems()
            )
        }catch (e: NoSuchElementException) {
            ResponseEntity.badRequest().body(ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                Date(),
                e.message,
                ServletUriComponentsBuilder.fromCurrentContextPath().toUriString()
            ))
        }
    }

    @GetMapping("/borrowed/pending")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    fun getAllPendingItems(): ResponseEntity<List<BorrowedItemResponse>> {
        return try {
            ResponseEntity.ok(
                itemService.findAllPendingItems()
            )
        }catch (e: NoSuchElementException) {
            ResponseEntity.status(204).body(
                listOf()
            )
        }
    }

    @PutMapping("/status/accept")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    fun acceptItemLending(@RequestParam id: Long): ResponseEntity<Any> {
        return try {
            val result = itemService.acceptItemLending(id)
            ResponseEntity.ok(result)
        } catch (e: kotlin.NoSuchElementException) {
            ResponseEntity.badRequest().body(
                MessageResponse("Invalid item id")
            )
        }
    }

    @DeleteMapping("/reclaim")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    fun reclaimItem(@RequestParam id: Long): ResponseEntity<HttpStatus> {
        itemService.deleteItemLendingByItemId(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
//        return try {
//            itemService.reclaimItem(id)
//            ResponseEntity(HttpStatus.NO_CONTENT)
//        }catch (e: Exception) {
//            ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
//        }
    }

    @GetMapping("/categories")
    fun getAllCategories(): ResponseEntity<List<Category>> {
        val cats = categoryRepository.findAll()
        return ResponseEntity.ok().body(
            cats
        )
    }

    @GetMapping("/subCategories")
    fun getAllSubCategories(): ResponseEntity<List<SubCategory>> {
        val cats = subCategoryRepository.findAll()
        return ResponseEntity.ok().body(
            cats
        )
    }

    @PostMapping("/categories/addCategory")
    @PreAuthorize("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    fun addNewCategory(@RequestBody category: NewCategoryRequest): ResponseEntity<Any> {
        val newCat = categoryRepository.save(Category(category.name))
        return ResponseEntity.ok(MessageResponse(
            "Category ${newCat.name} successfully added"
        ))
    }

    @PostMapping("/categories/addSubCategory")
    @PreAuthorize("hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    fun addNewSubCategory(@RequestBody subcategory: NewSubCategoryRequest): ResponseEntity<Any> {
        return if(categoryRepository.existsCategoryByName(subcategory.parentCategory)) {
            val parent = categoryRepository.findByName(subcategory.parentCategory)
            val newSubCat = subCategoryRepository.save(SubCategory(
                subcategory.name, parent
            ))
            ResponseEntity.ok(MessageResponse(
                "Subcategory ${newSubCat.name} successfully added"
            ))
        }else{
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse(
                "ParentCategory ${subcategory.parentCategory} was not found. Insert abandoned."
            ))
        }
    }

    @GetMapping("/search")
    fun searchForItems(@RequestParam text: String?, @RequestParam category: String?): ResponseEntity<Any> {
        if(text.isNullOrBlank() && category.isNullOrBlank()){
            val allItems = itemService.findAllNonBorrowedItems().map {
                ItemResponse(it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
                    "/files/${it.image.id}", it.description, it.borrowedBy)
            }
            return ResponseEntity.ok(allItems)
        }
        if(category.isNullOrBlank() && !text.isNullOrBlank()) {
            val itemsWithText = itemService.searchForAvailableItemsWithNameLike(text).map {
                ItemResponse(it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
                    "/files/${it.image.id}", it.description, it.borrowedBy)
            }
            return ResponseEntity.ok(itemsWithText)
        }
        if(text.isNullOrBlank() && !category.isNullOrBlank()) {
            val itemsWithCategory = itemService.findAvailableItemsWithCategory(category).map {
                ItemResponse(it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
                    "/files/${it.image.id}", it.description, it.borrowedBy)
            }
            return ResponseEntity.ok(itemsWithCategory)
        }

        val itemsWithNameAndCat = itemService.findAvailableItemsWithCategoryAndNameLike(text!!, category!!).map {
            ItemResponse(it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
                "/files/${it.image.id}", it.description, it.borrowedBy)
        }
        return ResponseEntity.ok(itemsWithNameAndCat)
    }

    @GetMapping("/recent")
    fun getRecentItems(@RequestParam num: Int): ResponseEntity<Any> {
        val items = itemService.getNumberOfRecentItems(num)
        return ResponseEntity.ok(items.map { ItemResponse(
            it.id!!, it.name, it.createdAt, it.category.name, it.subCategory.name,
            "/files/${it.image.id}", it.description, it.borrowedBy
        ) })
    }

}