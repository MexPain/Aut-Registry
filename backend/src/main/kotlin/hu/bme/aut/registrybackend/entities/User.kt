package hu.bme.aut.registrybackend.entities

import javax.persistence.*

@Entity
@Table(name = "users")
class User(
    val username: String,
    val password: String,
    val firstname: String,
    val lastname: String,

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")])
    var roles: Set<Role> = HashSet<Role>(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private val id: Long? = null
)