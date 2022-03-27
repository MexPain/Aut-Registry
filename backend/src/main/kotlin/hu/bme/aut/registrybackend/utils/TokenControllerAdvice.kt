package hu.bme.aut.registrybackend.utils

import hu.bme.aut.registrybackend.payloads.ErrorMessage
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import java.util.*

@RestControllerAdvice
class TokenControllerAdvice {

    @ExceptionHandler(TokenRefreshException::class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    fun handleTokenRefreshException(ex: TokenRefreshException, request: WebRequest): ErrorMessage {
        return ErrorMessage(
            HttpStatus.FORBIDDEN.value(),
            Date(),
            ex.message,
            request.getDescription(false)
        )
        //  return handleExceptionInternal(ex, body, HttpHeaders(), HttpStatus.FORBIDDEN, request)
    }
}