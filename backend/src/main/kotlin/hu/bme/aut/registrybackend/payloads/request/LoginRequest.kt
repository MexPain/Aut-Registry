package hu.bme.aut.registrybackend.payloads.request

data class LoginRequest(
    val email: String,
    val password: String,
)