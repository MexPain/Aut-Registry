package hu.bme.aut.registrybackend.payloads.request.itemRequests

class NewSubCategoryRequest(
    val name: String,
    val parentCategory: String,
)