package hu.bme.aut.registrybackend.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "users")
class User(
    val username: String,
    @JsonIgnore val password: String,
    val firstname: String,
    val lastname: String,
    //TODO email, phone, ...

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")])
    var roles: Set<Role> = hashSetOf(),

    @OneToMany(mappedBy = "user")
    var borrowedItems: MutableSet<ItemLending> = hashSetOf(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null
)