package hu.bme.aut.registrybackend.repositories.item

import hu.bme.aut.registrybackend.entities.Item.Item
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : JpaRepository<Item, Long> {
    @Query("SELECT i.id FROM Item i")
    fun getAllIds(): List<Long>

    @Query("SELECT i FROM Item i WHERE i.category.name = ?1")
    fun getAllWithCategoryName(category: String): List<Item>

    fun findAllByNameContaining(text: String): List<Item>

    @Query("SELECT i FROM Item i WHERE i.name = ?1 AND i.category.name = ?2")
    fun getAllWithCategoryNameAndNameContaining(text: String, category: String): List<Item>
}