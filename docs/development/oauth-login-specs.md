# Technical Specifications: Spring Boot + React OAuth Login

## 1. Files to Create / Modify
- **Backend (Spring Boot)**:
  - `backend/springboot/src/main/java/com/djp/backend/model/User.java`
  - `backend/springboot/src/main/java/com/djp/backend/controller/AuthController.java`
- **Frontend (React)**:
  - `frontend/src/components/LoginButtons.jsx`
- **QA Automated Tests**:
  - `backend/springboot/src/test/java/com/djp/backend/controller/AuthControllerTest.java`

## 2. Component Specs
- Auth endpoints under `/api/v1/auth/google` and `/api/v1/auth/github`.
- Spring Security saves profile to H2 database via `UserRepository`.
