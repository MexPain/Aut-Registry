package hu.bme.aut.registrybackend.repositories.item

import hu.bme.aut.registrybackend.entities.Item.SubCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SubCategoryRepository : JpaRepository<SubCategory, Long> {
    fun existsSubCategoryByName(name: String): Boolean
    fun findByName(name: String): SubCategory
}