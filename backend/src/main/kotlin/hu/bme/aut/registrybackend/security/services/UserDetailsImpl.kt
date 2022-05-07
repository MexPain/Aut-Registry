package hu.bme.aut.registrybackend.security.services

import com.fasterxml.jackson.annotation.JsonIgnore
import hu.bme.aut.registrybackend.entities.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import kotlin.streams.toList

data class UserDetailsImpl(
    private val id: Long,
    private val username: String,
    val email: String,
    val firstname: String,
    val lastname: String,
    @JsonIgnore
    private val password: String,
    private val authorities: MutableCollection<out GrantedAuthority>
) : UserDetails {
    companion object {
        private const val serialVersionUID: Long = 1L
        fun build(user: User): UserDetailsImpl {
            val authorities: MutableList<GrantedAuthority> = user.roles.stream()
                .map { SimpleGrantedAuthority(it.name!!.name) }
                .toList().toMutableList()
            return UserDetailsImpl(
                user.id!!,
                user.username,
                user.email,
                user.firstname?:"",
                user.lastname?:"",
                user.password,
                authorities
            )
        }
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return authorities
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}