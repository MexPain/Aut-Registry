package hu.bme.aut.registrybackend.entities

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
data class ItemLendingKey(
    @Column(name = "item_id") val itemId: Long? = null,
    @Column(name = "user_id") val userId: Long? = null,
) : java.io.Serializable