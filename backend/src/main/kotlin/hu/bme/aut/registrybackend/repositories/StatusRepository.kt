package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.Lending.EStatus
import hu.bme.aut.registrybackend.entities.Lending.Status
import org.springframework.data.jpa.repository.JpaRepository

interface StatusRepository : JpaRepository<Status, Long> {
    fun findByName(name: EStatus): Status?
}