package hu.bme.aut.registrybackend.payloads.request

data class NewItemRequest(
    val name: String,
    val description: String,
)