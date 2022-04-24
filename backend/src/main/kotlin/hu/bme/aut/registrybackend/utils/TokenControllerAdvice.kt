package hu.bme.aut.registrybackend.utils

import hu.bme.aut.registrybackend.payloads.response.ErrorMessage
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.util.*

@RestControllerAdvice
class TokenControllerAdvice : ResponseEntityExceptionHandler(){

    @ExceptionHandler(TokenRefreshException::class)
    fun handleTokenRefreshException(ex: TokenRefreshException, request: WebRequest): ResponseEntity<ErrorMessage> {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(
                ErrorMessage(
                    HttpStatus.FORBIDDEN.value(),
                    Date(),
                    ex.message,
                    request.getDescription(false)
                )
            )
    }
}