package hu.bme.aut.registrybackend.payloads

data class JwtResponse(
    val token: String,
    val refreshToken: String,
    val type: String = "Bearer",
)