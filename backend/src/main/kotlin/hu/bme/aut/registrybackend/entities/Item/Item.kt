package hu.bme.aut.registrybackend.entities.Item

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "items")
class Item(
    @Column(nullable = false)
    val name: String,
    @Column(nullable = false)
    val createdAt: Date,

    @ManyToOne
    @JoinColumn(name = "category_id")
    val category: Category,

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    val subCategory: SubCategory,

    @OneToMany(mappedBy = "item")
    var borrowedBy: MutableSet<ItemLending> = hashSetOf(),

    @OneToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    val image: FileStorage,

    val description: String? = null,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null

)