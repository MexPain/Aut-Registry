package hu.bme.aut.registrybackend.payloads.request

data class SignupRequest(
    val username: String,
    val password: String,
    val firstname: String,
    val lastname: String,
    var roles: Set<String> = setOf(),
)