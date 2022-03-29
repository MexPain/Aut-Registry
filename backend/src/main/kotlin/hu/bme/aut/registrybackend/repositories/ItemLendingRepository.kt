package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.ItemLending
import hu.bme.aut.registrybackend.entities.ItemLendingKey
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ItemLendingRepository : JpaRepository<ItemLending, ItemLendingKey> {
}