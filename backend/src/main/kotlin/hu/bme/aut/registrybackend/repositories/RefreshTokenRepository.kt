package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.RefreshToken
import hu.bme.aut.registrybackend.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RefreshTokenRepository : JpaRepository<RefreshToken, Long> {
    fun findByToken(token: String?): RefreshToken?
    fun deleteByUser(user: User)
}