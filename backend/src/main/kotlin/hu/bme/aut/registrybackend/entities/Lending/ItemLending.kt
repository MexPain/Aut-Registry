package hu.bme.aut.registrybackend.entities.Lending

import hu.bme.aut.registrybackend.entities.Item.Item
import hu.bme.aut.registrybackend.entities.User
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "user_item_lending")
class ItemLending(

    @OneToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    val item: Item,

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    val user: User,

    val lentAt: Date,

    @ManyToOne
    @JoinTable( name = "item_lending_status",
        joinColumns = [JoinColumn(name = "item_id"), JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "status_id")])
    var status: Status?,

    @EmbeddedId private val id: ItemLendingKey? = null,
)