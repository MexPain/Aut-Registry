package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.Role
import hu.bme.aut.registrybackend.entities.User
import hu.bme.aut.registrybackend.payloads.MessageResponse
import hu.bme.aut.registrybackend.payloads.SignupRequest
import hu.bme.aut.registrybackend.repositories.RoleRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class AuthController(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: PasswordEncoder,
) {

    @PostMapping("/signup")
    fun registerUser(
        @RequestBody signupRequest: SignupRequest
    ): ResponseEntity<Any> {

        if(userRepository.existsByUsername(signupRequest.username)) {
            return ResponseEntity
                .badRequest()
                .body(MessageResponse("Error: Username is already taken!"))
        }

        val user = signupRequest.let {
            User(it.username, passwordEncoder.encode(it.password), it.firstname, it.lastname)
        }
        val strRoles = signupRequest.roles
        val roles: MutableSet<Role> = hashSetOf()
        if(strRoles.isEmpty()) {
            val userRole = roleRepository.findByName(ERole.ROLE_USER)
                ?: throw RuntimeException("Error: Role is not found")
            roles.add(userRole)
        }else{
            strRoles.forEach {
                when(it) {
                    "admin"-> {
                        val adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(adminRole)
                    }
                    "mod" -> {
                        val modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(modRole)
                    }
                    else -> {
                        val userRole = roleRepository.findByName(ERole.ROLE_USER)
                            ?: throw RuntimeException("Error: Role is not found")
                        roles.add(userRole)
                    }
                }
            }
        }
        user.roles = roles
        userRepository.save(user)
        return ResponseEntity.ok(
            MessageResponse("User registered successfully")
        )
    }
}