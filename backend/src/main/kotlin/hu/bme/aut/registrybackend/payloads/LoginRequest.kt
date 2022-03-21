package hu.bme.aut.registrybackend.payloads

data class LoginRequest(
    val username: String,
    val password: String,
)