package hu.bme.aut.registrybackend.security.jwt

import hu.bme.aut.registrybackend.security.services.UserDetailsServiceCustom
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthTokenFilter(
    private val jwtUtils: JwtUtils,
    private val userDetailsService: UserDetailsServiceCustom
) : OncePerRequestFilter() {

    companion object {
        private val loggerz = LoggerFactory.getLogger(AuthTokenFilter::class.java)
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val jwt = parseJwt(request)
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
                val userName = jwtUtils.getUsernameFromToken(jwt)

                val userDetails = userDetailsService.loadUserByUsername(userName)
                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.authorities
                )
                authentication.details = WebAuthenticationDetailsSource()
                    .buildDetails(request)
                SecurityContextHolder.getContext().authentication = authentication
            }
        }catch (e: Exception) {
            loggerz.error("Cannot set user authentication: {}", e)
        }
        filterChain.doFilter(request, response)
    }

    private fun parseJwt(request: HttpServletRequest): String? {
        val headerAuth: String? = request.getHeader("Authorization")
        loggerz.info("HeaderAuth: $headerAuth") //TODO
        return if(headerAuth != null && headerAuth.startsWith("Bearer ")) {
            headerAuth.substring(7, headerAuth.length)
        }else{
            null
        }
    }

}