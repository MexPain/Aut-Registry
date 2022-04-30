package hu.bme.aut.registrybackend.services

import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.repositories.FileStorageRepository
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile

@Service
class FileStorageService(
    private val fileStorageRepository: FileStorageRepository
) {
    fun store(file: MultipartFile): FileStorage {
        val fileName = StringUtils.cleanPath(file.originalFilename!!)
        val newFile =  FileStorage(fileName, file.contentType!!, file.bytes)
        return fileStorageRepository.save(newFile)
    }

    fun getFile(id: String): FileStorage = fileStorageRepository.findById(id).get()
    fun isFileWithIdExists(id: String): Boolean = fileStorageRepository.existsById(id)
}