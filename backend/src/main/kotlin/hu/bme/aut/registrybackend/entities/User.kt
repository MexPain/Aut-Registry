package hu.bme.aut.registrybackend.entities

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import hu.bme.aut.registrybackend.entities.Lending.ItemLending
import hu.bme.aut.registrybackend.payloads.utils.ILBorrowedItemsSerializer
import javax.persistence.*

@Entity
@Table(name = "users")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator::class, property = "id")
class User(
    @Column(nullable = false, unique = true)
    val username: String,

    @Column(nullable = false)
    val email: String,

    @JsonIgnore @Column(nullable = false)
    val password: String,

    val firstname: String? = null,
    val lastname: String? = null,
    val description: String? = null,
    val phone: String? = null,

    @OneToOne
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    val image: FileStorage? = null,

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")])
    var roles: Set<Role> = hashSetOf(),

    @JsonSerialize(using = ILBorrowedItemsSerializer::class)
    @OneToMany(mappedBy = "user")
    var borrowedItems: MutableSet<ItemLending> = hashSetOf(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null
)