package hu.bme.aut.registrybackend.entities.Item

import javax.persistence.*

@Entity
@Table(name = "item_subcategories")
class SubCategory(

    @Column(nullable = false, unique = true)
    val name: String,

    @ManyToOne
    @JoinColumn(name="category_id")
    val parentCategory: Category,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
)