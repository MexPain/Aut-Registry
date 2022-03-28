package hu.bme.aut.registrybackend.payloads.response

data class JwtResponse(
    val token: String,
    val refreshToken: String,
    val type: String = "Bearer",
)