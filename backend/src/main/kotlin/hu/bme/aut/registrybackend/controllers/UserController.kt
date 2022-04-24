package hu.bme.aut.registrybackend.controllers

import hu.bme.aut.registrybackend.entities.ItemLending
import hu.bme.aut.registrybackend.entities.ItemLendingKey
import hu.bme.aut.registrybackend.payloads.response.FileResponse
import hu.bme.aut.registrybackend.payloads.response.MessageResponse
import hu.bme.aut.registrybackend.payloads.response.ProfileResponse
import hu.bme.aut.registrybackend.repositories.ItemLendingRepository
import hu.bme.aut.registrybackend.repositories.ItemRepository
import hu.bme.aut.registrybackend.repositories.UserRepository
import hu.bme.aut.registrybackend.services.FileStorageService
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userRepository: UserRepository,
    private val itemRepository: ItemRepository,
    private val itemLendingRepository: ItemLendingRepository,
    private val fileStorageService: FileStorageService,
) {
    //ez a 2 még a másikból maradt, lehet nem kell majd
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
                        .path("/files/")
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


    @GetMapping("/profile")
//    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")  //ez nem kell ha mind3 lehet, csak ha kevesebb
    fun getUserProfile() : ResponseEntity<Any> {
        val user: User = SecurityContextHolder.getContext().authentication.principal as User
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        return ResponseEntity.ok(
            ProfileResponse(
                userData.username, userData.email,
                userData.firstname, userData.lastname,
                userData.description, userData.phone,
                userData.image?.data,
                )
        )
    }

    @PostMapping("/lend/{itemId}")
    fun lendItemToCurrentUser(@PathVariable itemId: Long): ResponseEntity<Any> {
        val item = itemRepository.findById(itemId).get()
        val user = SecurityContextHolder.getContext().authentication.principal as User
        val userData = userRepository.findByUsername(user.username)
            ?: throw UsernameNotFoundException("Logged in profile was not found")

        val newItemLending = ItemLending(
            item = item,
            user = userData,
            Date(),
            Date((Date()).time + 18_000_000L),
            ItemLendingKey(item.id, userData.id)
        )
        itemLendingRepository.save(newItemLending)
        userData.borrowedItems.add(newItemLending)
        val savedData = userRepository.save(userData)
        return ResponseEntity.ok(
            savedData
        )
    }
}