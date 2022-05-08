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
}