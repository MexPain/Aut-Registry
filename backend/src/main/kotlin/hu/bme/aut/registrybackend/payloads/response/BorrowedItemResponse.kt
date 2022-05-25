package hu.bme.aut.registrybackend.payloads.response

import java.util.Date

class BorrowedItemResponse(
    val itemId: Long,
    val userId: Long,
    val itemName: String,
    val userName: String,
    val lentAt: Date,
    val status: String,
)