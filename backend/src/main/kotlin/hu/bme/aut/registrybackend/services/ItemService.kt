package hu.bme.aut.registrybackend.services

import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.entities.Item.Item
import hu.bme.aut.registrybackend.entities.Lending.EStatus
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.payloads.request.itemRequests.NewItemRequest
import hu.bme.aut.registrybackend.payloads.response.BorrowedItemResponse
import hu.bme.aut.registrybackend.payloads.response.ItemResponse
import hu.bme.aut.registrybackend.repositories.ItemLendingRepository
import hu.bme.aut.registrybackend.repositories.StatusRepository
import hu.bme.aut.registrybackend.repositories.item.CategoryRepository
import hu.bme.aut.registrybackend.repositories.item.ItemRepository
import hu.bme.aut.registrybackend.repositories.item.SubCategoryRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import kotlin.NoSuchElementException

@Service
class ItemService(
    private val itemRepository: ItemRepository,
    private val categoryRepository: CategoryRepository,
    private val subCategoryRepository: SubCategoryRepository,
    private val fileStorageService: FileStorageService,
    private val itemLendingRepository: ItemLendingRepository,
    private val statusRepository: StatusRepository,
) {
    fun findAllItems(): List<ItemResponse> {
        val dbItems = itemRepository.findAll()
        val result = mutableListOf<ItemResponse>()
        dbItems.forEach() { item ->
            result.add(ItemResponse(
                item.id!!,
                item.name,
                item.createdAt,
                item.category.name,
                item.subCategory.name,
                "/files/${item.image.id}",
                item.description,
                item.borrowedBy,
                )
            )
        }
        return result
    }

    fun findItem(id: Long): ItemResponse {
        val dbItem = itemRepository.findById(id).get()
        return ItemResponse(
            dbItem.id!!,
            dbItem.name,
            dbItem.createdAt,
            dbItem.category.name,
            dbItem.subCategory.name,
            "/files/${dbItem.image.id}",
            dbItem.description,
            dbItem.borrowedBy,
        )
    }

    fun findItemsOfUser(user: User) {}

    fun addNewItem(item: NewItemRequest): ItemResponse {
        if(categoryRepository.existsCategoryByName(item.category)) {
            if( subCategoryRepository.existsSubCategoryByName(item.subCategory)) {
                val cat = categoryRepository.findByName(item.category)
                val subCat = subCategoryRepository.findByName(item.subCategory)

                //handling the image
                var image: FileStorage? = null
                item.imageUrl?.let {
                    val imageId = it.split("/").last()
                    image = fileStorageService.getFile(imageId)
                }

                val newItem = itemRepository.save(Item(
                    name = item.name,
                    createdAt = Date(),
                    category = cat,
                    subCategory = subCat,
                    image = image!!,
                    description = item.description
                ))
                return findItem(newItem.id!!)
            }else {
                throw NoSuchElementException("SubCategory doesn't exists")
            }
        }else {
            throw NoSuchElementException("Category doesn't exists")
        }


    }

    fun findAllNonBorrowedItems(): List<Item> {
        val items = itemRepository.findAll()
        return filterAvailableItems(items)
    }

    fun findAllAcceptedItems(): List<BorrowedItemResponse> {
        val lendings = itemLendingRepository.findAllItemsWithStatus(EStatus.STATUS_ACCEPTED)
        if(lendings.isEmpty())
            throw kotlin.NoSuchElementException("No items are borrowed")

        return lendings.map {
            BorrowedItemResponse(
                it.item.id!!,
                it.user.id!!,
                it.item.name,
                it.user.username,
                it.lentAt,
                it.status!!.name.name
            )
        }
    }

    fun findAllPendingItems(): List<BorrowedItemResponse> {
        val lendings = itemLendingRepository.findAllItemsWithStatus(EStatus.STATUS_PENDING)
        if(lendings.isEmpty())
            throw kotlin.NoSuchElementException("No pending items")

        return lendings.map {
            BorrowedItemResponse(
                it.item.id!!,
                it.user.id!!,
                it.item.name,
                it.user.username,
                it.lentAt,
                it.status!!.name.name
            )
        }
    }

    fun acceptItemLending(itemId: Long): BorrowedItemResponse {
        val lending = itemLendingRepository.findItemLendingByItemId(itemId)
            ?: throw kotlin.NoSuchElementException("Lending data doesn't exist for this item")
        val acceptStatus = statusRepository.findByName(EStatus.STATUS_ACCEPTED)
            ?: throw EnumConstantNotPresentException(EStatus::class.java, EStatus.STATUS_ACCEPTED.name)
        lending.status = acceptStatus
        return itemLendingRepository.save(lending).run { BorrowedItemResponse(
            this.item.id!!,
            this.user.id!!,
            this.item.name,
            this.user.username,
            this.lentAt,
            this.status!!.name.name
        ) }
    }

    @Transactional
    fun deleteItemLendingByItemId(id: Long) {
        val il = itemLendingRepository.findItemLendingByItemId(id)
            ?: throw kotlin.NoSuchElementException()

        il.status = null

        itemLendingRepository.delete(il)
    }

    @Transactional
    fun deleteItemLendingsByUserId(id: Long) {
        val il = itemLendingRepository.findItemLendingsByUserId(id)
            ?: throw kotlin.NoSuchElementException()

        il.forEach() {
            it.status = null
        }
        itemLendingRepository.deleteAll(il)
    }

    fun searchForAvailableItemsWithNameLike(textQuery: String): List<Item> {
        val items = itemRepository.findAllByNameContaining(textQuery)
        return filterAvailableItems(items)
    }

    fun findAvailableItemsWithCategory(categoryParam: String): List<Item> {
        val items = itemRepository.getAllWithCategoryName(categoryParam)
        return filterAvailableItems(items)
    }

    fun findAvailableItemsWithCategoryAndNameLike(textQuery: String, categoryParam: String): List<Item> {
        val items = itemRepository.getAllWithCategoryNameAndNameContaining(textQuery, categoryParam)
        return filterAvailableItems(items)
    }

    private fun filterAvailableItems(items: List<Item>): List<Item> {
        val refIds = itemLendingRepository.findAllItemIdsDistinct()
        val filtered = items.filter {
            !refIds.contains(it.id)
        }
        return filtered
    }

}