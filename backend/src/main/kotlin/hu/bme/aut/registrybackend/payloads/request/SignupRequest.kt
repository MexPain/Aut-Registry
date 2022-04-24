package hu.bme.aut.registrybackend.payloads.request

data class SignupRequest(
    val username: String,
    val email: String,
    val password: String,
    val firstname: String,
    val lastname: String,
    val description: String,
    val phone: String,
    //image as requestParam
    var roles: Set<String> = setOf(),
)