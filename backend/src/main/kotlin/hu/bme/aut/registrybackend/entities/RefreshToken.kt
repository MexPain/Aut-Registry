package hu.bme.aut.registrybackend.entities

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "refreshtokens")
class RefreshToken(
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    @Column(nullable = false, unique = true)
    val token: String,

    @Column(nullable = false)
    val expiryDate: Instant,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private val id: Long? = null,
)