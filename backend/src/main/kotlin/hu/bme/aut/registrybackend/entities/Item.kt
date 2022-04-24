package hu.bme.aut.registrybackend.entities

import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "items")
class Item(
    val name: String,
    val created: Date,

    @OneToMany(mappedBy = "item")
    var borrowedBy: MutableSet<ItemLending> = hashSetOf(),

    @OneToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    val images: FileStorage? = null,    //ja és ez vszeg lista lesz

    val description: String = "",
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null

)