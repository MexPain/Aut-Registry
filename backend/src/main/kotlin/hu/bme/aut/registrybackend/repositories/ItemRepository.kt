package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.Item
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : JpaRepository<Item, Long> {

}