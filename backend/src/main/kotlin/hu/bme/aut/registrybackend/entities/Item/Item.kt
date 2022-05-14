package hu.bme.aut.registrybackend.entities.Item

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import hu.bme.aut.registrybackend.entities.FileStorage
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.payloads.utils.ILBorrowedBySerializer
import java.util.Date
import javax.persistence.*

@Entity
@Table(name = "items")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator::class, property = "id")
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

    @JsonSerialize(using = ILBorrowedBySerializer::class)
    @OneToOne(mappedBy = "item")
    var borrowedBy: ItemLending? = null,

    @OneToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    val image: FileStorage,

    val description: String? = null,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null

)