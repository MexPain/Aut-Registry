package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ItemLendingRepository : JpaRepository<ItemLending, ItemLendingKey> {
    @Query("SELECT case when count(il) > 0 then true else false end FROM ItemLending il WHERE il.id.itemId = ?1 AND il.id.userId = ?2")
    fun isItemWithIdBorrowByUserWithId(itemId: Long, userId: Long): Boolean
}