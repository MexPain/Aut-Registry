package hu.bme.aut.registrybackend.entities

import javax.persistence.*

@Entity
@Table(name = "roles")
class Role (
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    var name: ERole?,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
)