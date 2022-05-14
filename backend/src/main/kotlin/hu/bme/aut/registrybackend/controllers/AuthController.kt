package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ERole
import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.entities.Role
import hu.bme.aut.registrybackend.payloads.request.LoginRequest
import hu.bme.aut.registrybackend.payloads.request.SignupRequest
import hu.bme.aut.registrybackend.payloads.request.TokenRefreshRequest
import hu.bme.aut.registrybackend.payloads.response.ErrorMessage
import hu.bme.aut.registrybackend.payloads.response.JwtResponse
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.payloads.response.TokenRefreshResponse
import hu.bme.aut.registrybackend.repositories.RoleRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.security.jwt.JwtUtils
import hu.bme.aut.registrybackend.security.services.RefreshTokenService
import hu.bme.aut.registrybackend.security.services.UserDetailsImpl
import hu.bme.aut.registrybackend.services.FileStorageService
import hu.bme.aut.registrybackend.utils.TokenRefreshException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.*
import kotlin.streams.toList

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtils: JwtUtils,
    private val authManager: AuthenticationManager,
    private val refreshTokenService: RefreshTokenService,
    private val fileStorageService: FileStorageService,
) {

    @PostMapping("/signup")
    fun registerUser(
        @RequestBody signupRequest: SignupRequest
    ): ResponseEntity<Any> {
        //check if user already exists
        if(userRepository.existsByUsername(signupRequest.username)) {
            return ResponseEntity
                .badRequest()
                .body(MessageResponse("Error: Username is already taken!"))
        }

        //handling the image
        var image: FileStorage? = null
        signupRequest.imageUrl?.let {
            val imageId = it.split("/").last()
            image = fileStorageService.getFile(imageId)
        }

        //creating new user
        val user = signupRequest.let {
            hu.bme.aut.registrybackend.entities.User(
                username = it.username,
                email = it.email,
                password = passwordEncoder.encode(it.password),
                firstname = it.firstname, lastname = it.lastname,
                description = it.description, phone = it.phone,
                image = image,
            )
        }
        //configuring user's roles
        val strRoles = signupRequest.roles
        val roles: MutableSet<Role> = hashSetOf()
        try{
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
        }catch (e: RuntimeException) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                ErrorMessage(
                    HttpStatus.EXPECTATION_FAILED.value(),
                    Date(),
                    e.message,
                    ServletUriComponentsBuilder.fromCurrentContextPath().toUriString()
                )
            )
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

        val userDetails: UserDetailsImpl = authentication.principal as UserDetailsImpl
        val refreshToken = refreshTokenService.createRefreshToken(userDetails.username)
        val roles = userDetails.authorities.stream()
            .map { it.authority }.toList()
        return ResponseEntity.ok(JwtResponse(jwt, refreshToken.token, userDetails.firstname,
            userDetails.lastname,userDetails.email, roles, userDetails.imageUrl))
    }

    @PostMapping("/refreshtoken")
    fun refreshToken(@RequestBody request: TokenRefreshRequest): ResponseEntity<Any> {
        val refreshToken = refreshTokenService.findByToken(request.refreshToken)
        if(refreshToken != null && refreshTokenService.verifyExpiration(refreshToken)){
            val user = refreshToken.user
            val token = jwtUtils.generateTokenFromUsername(user.username)
            return ResponseEntity.ok(
                TokenRefreshResponse(
                token, request.refreshToken
            )
            )
        }else{
            throw TokenRefreshException(request.refreshToken,
                "Refresh token is not in database!")
        }

    }
}