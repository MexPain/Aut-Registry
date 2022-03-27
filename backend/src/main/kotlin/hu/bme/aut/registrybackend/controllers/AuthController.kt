package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.Role
import hu.bme.aut.registrybackend.payloads.*
import hu.bme.aut.registrybackend.repositories.RoleRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.security.jwt.JwtUtils
import hu.bme.aut.registrybackend.security.services.RefreshTokenService
import hu.bme.aut.registrybackend.utils.TokenRefreshException
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.GetMapping
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
    private val jwtUtils: JwtUtils,
    private val authManager: AuthenticationManager,
    private val refreshTokenService: RefreshTokenService
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
            hu.bme.aut.registrybackend.entities.User(it.username,
                passwordEncoder.encode(it.password),
                it.firstname, it.lastname)
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

    @PostMapping("/signin")
    fun authenticateUser(@RequestBody loginRequest: LoginRequest) : ResponseEntity<Any> {
        val authentication = authManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtUtils.generateJwtToken(authentication)

        val userDetails: User = authentication.principal as User
        val refreshToken = refreshTokenService.createRefreshToken(userDetails.username)
//        val roles = userDetails.authorities.stream()
//            .map { it.authority }.toList()
        return ResponseEntity.ok(JwtResponse(jwt, refreshToken.token))
    }

    @PostMapping("/refreshtoken")
    fun refreshToken(@RequestBody request: TokenRefreshRequest): ResponseEntity<Any> {
        val refreshToken = refreshTokenService.findByToken(request.refreshToken)
        if(refreshToken != null && refreshTokenService.verifyExpiration(refreshToken)){
            val user = refreshToken.user
            val token = jwtUtils.generateTokenFromUsername(user.username)
            return ResponseEntity.ok(TokenRefreshResponse(
                token, request.refreshToken
            ))
        }else{
            throw TokenRefreshException(request.refreshToken,
                "Refresh token is not in database!")
//            return ResponseEntity
//                .badRequest()
//                .body("Bla bla bla")
        }

    }

    @GetMapping("/profile")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    fun getUserProfile() : ResponseEntity<Any> {
        val user: User = SecurityContextHolder.getContext().authentication.principal as User
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        return ResponseEntity.ok(ProfileResponse(userData.username,
            userData.firstname, userData.lastname))
    }
}