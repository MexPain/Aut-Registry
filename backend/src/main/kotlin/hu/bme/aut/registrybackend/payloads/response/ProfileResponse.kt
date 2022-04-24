package hu.bme.aut.registrybackend.payloads.response

class ProfileResponse(
    val username: String,
    val email: String,
    val firstname: String?,
    val lastname: String?,
    val description: String?,
    val phone: String?,
    val image: ByteArray?,
)