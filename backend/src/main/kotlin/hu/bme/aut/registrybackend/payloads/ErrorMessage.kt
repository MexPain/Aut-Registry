package hu.bme.aut.registrybackend.payloads

import java.util.Date

data class ErrorMessage(
    private val statusCode: Int,
    private val timestamp: Date,
    private val message: String?,
    private val description: String,
)