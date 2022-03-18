package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository : JpaRepository<Role, Long> {
    fun findByName(name: ERole?): Role?
}