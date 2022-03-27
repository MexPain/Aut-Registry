package hu.bme.aut.registrybackend.payloads

data class TokenRefreshRequest(
    val refreshToken: String
)