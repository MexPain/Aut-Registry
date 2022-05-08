package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ItemLendingRepository : JpaRepository<ItemLending, ItemLendingKey> {
    @Query("SELECT case when count(il) > 0 then true else false end FROM ItemLending il WHERE il.id.itemId = ?1")
    fun isItemWithIdBorrowed(itemId: Long): Boolean

    @Query("SELECT DISTINCT il.item.id FROM ItemLending il")
    fun findAllItemIdsDistinct(): List<Long>
}