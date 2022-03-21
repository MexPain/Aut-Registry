package hu.bme.aut.registrybackend.security.services

import hu.bme.aut.registrybackend.repositories.UserRepository
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class UserDetailsServiceCustom(
    val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User was not found with username: $username")
        return User(user.username, user.password, user.roles.stream().map {
            SimpleGrantedAuthority(it.name.toString())
        }.toList())
    }
}