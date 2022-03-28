package hu.bme.aut.registrybackend.payloads.request

data class TokenRefreshRequest(
    val refreshToken: String
)