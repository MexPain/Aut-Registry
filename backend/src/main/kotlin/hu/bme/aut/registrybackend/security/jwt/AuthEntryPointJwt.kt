package hu.bme.aut.registrybackend.security.jwt

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthEntryPointJwt : AuthenticationEntryPoint {
    companion object {
        private val logger = LoggerFactory.getLogger(JwtUtils::class.java)
    }

    override fun commence(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authException: AuthenticationException?
    ) {
        logger.error("Unauthorized error: {}", authException?.message)
//        response?.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized")

        response?.contentType = MediaType.APPLICATION_JSON_VALUE
        response?.status = HttpServletResponse.SC_UNAUTHORIZED

        val body: Map<String, Any> = mutableMapOf(
            "status" to HttpServletResponse.SC_UNAUTHORIZED,
            "error" to "Unauthorized",
            "message" to (authException?.message ?: "no message"),
            "path" to (request?.servletPath ?: "")
        )

        val mapper = ObjectMapper()
        mapper.writeValue(response!!.outputStream, body)
    }
}