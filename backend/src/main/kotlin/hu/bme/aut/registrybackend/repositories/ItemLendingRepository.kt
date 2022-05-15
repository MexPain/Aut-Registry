package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.Lending.EStatus
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.entities.Lending.ItemLendingKey
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface ItemLendingRepository : JpaRepository<ItemLending, ItemLendingKey> {
    @Query("SELECT case when count(il) > 0 then true else false end FROM ItemLending il WHERE il.id.itemId = ?1")
    fun isItemWithIdBorrowed(itemId: Long): Boolean

    @Query("SELECT DISTINCT il.item.id FROM ItemLending il")
    fun findAllItemIdsDistinct(): List<Long>

    @Query("SELECT il FROM ItemLending il WHERE il.item.id = ?1")
    fun findItemLendingByItemId(id: Long): ItemLending?

    @Query("SELECT il FROM ItemLending il WHERE il.status.name = ?1")
    fun findAllItemsWithStatus(statusName: EStatus): List<ItemLending>

    @Query("SELECT il FROM ItemLending il WHERE il.user.id = ?1")
    fun findItemLendingsByUserId(id: Long): List<ItemLending>?
}