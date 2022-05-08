package hu.bme.aut.registrybackend.services

import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.entities.Item.Item
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.payloads.request.itemRequests.NewItemRequest
import hu.bme.aut.registrybackend.payloads.response.ItemResponse
import hu.bme.aut.registrybackend.repositories.item.CategoryRepository
import hu.bme.aut.registrybackend.repositories.item.ItemRepository
import hu.bme.aut.registrybackend.repositories.item.SubCategoryRepository
import org.springframework.stereotype.Service
import java.util.*
import kotlin.NoSuchElementException

@Service
class ItemService(
    private val itemRepository: ItemRepository,
    private val categoryRepository: CategoryRepository,
    private val subCategoryRepository: SubCategoryRepository,
    private val fileStorageService: FileStorageService,
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

}