package hu.bme.aut.registrybackend.entities.Item

import javax.persistence.*

@Entity
@Table(name = "item_categories")
class Category(

    @Column(nullable = false, unique = true)
    val name: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
)