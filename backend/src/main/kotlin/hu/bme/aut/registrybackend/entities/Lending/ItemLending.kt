package hu.bme.aut.registrybackend.entities.Lending

import hu.bme.aut.registrybackend.entities.Item.Item
import hu.bme.aut.registrybackend.entities.User
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "user_item_lending")
class ItemLending(
    //@JsonIgnore
    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    val item: Item,

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    val user: User,

    val lentAt: Date,
    val deadline: Date,

    @EmbeddedId private val id: ItemLendingKey? = null,
)