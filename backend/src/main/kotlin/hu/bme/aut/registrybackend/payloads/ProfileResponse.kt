package hu.bme.aut.registrybackend.payloads

data class ProfileResponse( //TODO additional info
    val username: String,
    val firstname: String,
    val lastname: String
)