# Technical Architecture: Spring Boot OAuth2 Login

## 1. Tech Stack (Discovered from docs)
- **Language & Framework**: Java 21 + Spring Boot 3.x (`backend/springboot/`)
- **Database**: Embedded H2 Database (`schema.sql`)
- **Security**: Spring Security OAuth2 Client (Google & GitHub/LinkedIn)

## 2. Database Schema (`users` table in H2)
Defined in `backend/springboot/src/main/resources/schema.sql`:
- `id` (UUID Primary Key)
- `email` (VARCHAR Unique)
- `name` (VARCHAR)
- `auth_provider` (VARCHAR - 'google' | 'github')
- `provider_id` (VARCHAR)

## 3. Spring Boot Package Structure (`com.djp.backend`)
- `model/User.java` -> JPA Entity
- `repository/UserRepository.java` -> Spring Data JPA
- `controller/AuthController.java` -> REST endpoints (`/api/v1/auth/*`)
