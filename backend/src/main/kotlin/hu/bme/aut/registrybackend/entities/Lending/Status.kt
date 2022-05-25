package hu.bme.aut.registrybackend.entities.Lending

import javax.persistence.*

@Entity
@Table(name = "statuses")
class Status(
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    var name: EStatus,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
)