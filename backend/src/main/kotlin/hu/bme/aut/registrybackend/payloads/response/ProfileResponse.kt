package hu.bme.aut.registrybackend.payloads.response

import hu.bme.aut.registrybackend.entities.Lending.ItemLending

class ProfileResponse(
    val username: String,
    val email: String,
    val firstname: String?,
    val lastname: String?,
    val description: String?,
    val phone: String?,
    val imageUrl: String?,
    val roles: List<String>,
    val borrowedItems: Set<ItemLending>,
)