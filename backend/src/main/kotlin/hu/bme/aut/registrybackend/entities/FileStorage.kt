package hu.bme.aut.registrybackend.entities

import org.hibernate.annotations.GenericGenerator
import javax.persistence.*

@Entity
@Table(name = "files")
class FileStorage(
    val name: String,
    val type: String,
    @Lob
    val data: ByteArray,

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    val id: String? = null,
)