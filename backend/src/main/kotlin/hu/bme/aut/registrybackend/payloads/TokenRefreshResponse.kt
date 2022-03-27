package hu.bme.aut.registrybackend.payloads

data class TokenRefreshResponse(
    val token: String,
    val refreshToken: String,
    val type: String = "Bearer",
)