package hu.bme.aut.registrybackend.payloads.request

data class LoginRequest(
    val username: String,
    val password: String,
)