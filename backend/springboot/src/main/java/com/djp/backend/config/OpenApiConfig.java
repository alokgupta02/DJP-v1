package com.djp.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "DJP Platform REST API Specification",
        version = "v1.0.0",
        description = "Canonical Spring Boot 3.x REST API contracts (`/djp/api/v1`) for Digital Janata Party civic deliberation, issue reporting, and governance modules.",
        license = @License(name = "MIT License", url = "https://opensource.org/licenses/MIT")
    ),
    servers = {
        @Server(url = "http://localhost:8081", description = "Local Development & Prototype Server"),
        @Server(url = "http://localhost:8080", description = "Standard Local Server Port")
    }
)
@SecurityScheme(
    name = "BearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "Enter your JWT token obtained from `/djp/api/v1/auth/dev-login` or OAuth2 callback session."
)
public class OpenApiConfig {
}
