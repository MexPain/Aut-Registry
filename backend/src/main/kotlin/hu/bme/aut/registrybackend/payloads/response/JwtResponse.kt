package hu.bme.aut.registrybackend.payloads.response

data class JwtResponse(
    val token: String,
    val refreshToken: String,
    val firstname: String,
    val lastname: String,
    val email: String,
    val roles: List<String>,
    val type: String = "Bearer",
)