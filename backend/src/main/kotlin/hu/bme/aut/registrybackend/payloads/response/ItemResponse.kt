package hu.bme.aut.registrybackend.payloads.response

import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import java.util.*

class ItemResponse(
    val id: Long,
    val name: String,
    val createdAt: Date,
    val category: String,
    val subCategory: String,
    val images: String,
    val description: String?,
    val borrowBy: ItemLending?,
)