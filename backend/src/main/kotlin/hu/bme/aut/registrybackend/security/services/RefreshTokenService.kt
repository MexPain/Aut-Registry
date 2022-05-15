package hu.bme.aut.registrybackend.security.services

import hu.bme.aut.registrybackend.entities.RefreshToken
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.repositories.RefreshTokenRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.utils.TokenRefreshException
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.*

@Service
class RefreshTokenService(
    @Value("\${jwt.jwtRefreshExpirationMs}")
    private val refreshTokenDurationMs: Long,
    private val refreshTokenRepository: RefreshTokenRepository,
    private val userRepository: UserRepository
) {
    fun findByToken(token: String) = refreshTokenRepository.findByToken(token)

    @Transactional
    fun createRefreshToken(username: String): RefreshToken {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User was not found with username: $username")

        val refreshToken = RefreshToken(
            user = user,
            token = UUID.randomUUID().toString(),
            expiryDate = Instant.now().plusMillis(refreshTokenDurationMs)
        )
        deleteAllByUser(user)   //remove the previous ones (if any)
        return refreshTokenRepository.save(refreshToken)

    }

    fun verifyExpiration(token: RefreshToken): Boolean {
        if(token.expiryDate < Instant.now()) {
            refreshTokenRepository.delete(token)
            throw TokenRefreshException(token.token,
            "Refresh token was expired. Please make a new signin request")
        }
        return true
    }

    @Transactional
    fun deleteAllByUser(user: User): Int {
        return refreshTokenRepository.deleteAllByUser(user)
    }
}