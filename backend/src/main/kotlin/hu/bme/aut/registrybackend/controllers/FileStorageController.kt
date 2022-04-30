package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.payloads.response.FileResponse
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.services.FileStorageService
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

@RestController
@RequestMapping("/api/files")
class FileStorageController(
    private val fileStorageService: FileStorageService
) {

    @PostMapping("/upload")
    fun uploadFile(@RequestParam("file") file: MultipartFile): ResponseEntity<Any> {
        var message = ""
        return try {
            val savedFile = fileStorageService.store(file)
            message = "File upload successful"
            ResponseEntity.status(HttpStatus.OK).body(
                savedFile.let { FileResponse(
                    it.id!!, it.name,
                    ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path(it.id)
                        .toUriString(),
                    it.type,
                    "${it.data.size.toDouble()/1024} KB",
                    message
                ) }
            )
        }catch (e: IllegalArgumentException) {
            message = "Could not upload the file: " + file.originalFilename + "!";
            ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                MessageResponse(message)
            )
        }
    }

    @GetMapping("/files/{id}")
    fun getListFiles(@PathVariable id: String): ResponseEntity<ByteArray> {
        val fileDb = fileStorageService.getFile(id)
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDb.name + "\"")
            .body(fileDb.data)
    }
}