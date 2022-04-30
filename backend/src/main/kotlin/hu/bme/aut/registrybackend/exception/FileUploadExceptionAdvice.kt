package hu.bme.aut.registrybackend.exception

import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.multipart.MaxUploadSizeExceededException
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class FileUploadExceptionAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(MaxUploadSizeExceededException::class)
    fun handleMaxSizeException(exc: MaxUploadSizeExceededException): ResponseEntity<MessageResponse> {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
            .body(MessageResponse("File too large!"))
    }
}