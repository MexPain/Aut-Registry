package hu.bme.aut.registrybackend.entities

import javax.persistence.*

@Entity
@Table(name = "items")
class Item(
    val name: String,

    @OneToMany(mappedBy = "item")
    var borrowedBy: Set<ItemLending>?,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private val id: Long? = null
)