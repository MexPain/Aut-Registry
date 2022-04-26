package hu.bme.aut.registrybackend.payloads.request.itemRequests

data class NewItemRequest(
    val name: String,
    val category: String,
    val subCategory: String,
    val imageId: String,
    val description: String? = null,
)