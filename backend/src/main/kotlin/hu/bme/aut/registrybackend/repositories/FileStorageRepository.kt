package hu.bme.aut.registrybackend.repositories

import hu.bme.aut.registrybackend.entities.FileStorage
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FileStorageRepository : JpaRepository<FileStorage, String> {
}