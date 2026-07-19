# ------------------------------------------------------------------------------
# Build Stage
# ------------------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy pom.xml and dependency definitions first for caching
COPY pom.xml .

# Download dependencies to cache them locally in the image layer
RUN mvn dependency:go-offline -B

# Copy the rest of the application source code
COPY src ./src

# Compile and package the application into a thin jar (skip tests for build speed, verify via CI instead)
RUN mvn clean package -DskipTests -B

# ------------------------------------------------------------------------------
# Runtime Stage
# ------------------------------------------------------------------------------
FROM eclipse-temurin:21-jre-jammy

# Create a non-privileged system user/group to run the application securely
RUN groupadd -r djp && useradd -r -g djp -s /bin/false djp

WORKDIR /app

# Copy the packaged jar file from the builder stage
COPY --from=builder /build/target/*.jar app.jar

# Set ownership of the runtime directory to the non-root user
RUN chown -R djp:djp /app

# Run the container as the non-privileged user
USER djp

# Expose standard application port
EXPOSE 8080

# Configure production environment variables defaults
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080

# Command to execute the application
ENTRYPOINT ["java", "-jar", "app.jar"]
