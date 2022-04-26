package hu.bme.aut.registrybackend.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.GenericGenerator
import javax.persistence.*

@Entity
@Table(name = "files")
class FileStorage(
    val name: String,
    val type: String,
    @Lob
    @JsonIgnore
    val data: ByteArray,

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    val id: String? = null,
)