package hu.bme.aut.registrybackend.repositories.item

import hu.bme.aut.registrybackend.entities.Item.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : JpaRepository<Category, Long> {
    fun existsCategoryByName(name: String): Boolean
    fun findByName(name: String): Category
}