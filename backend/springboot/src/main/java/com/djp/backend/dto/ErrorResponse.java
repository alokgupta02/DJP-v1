package com.djp.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Map;

@Schema(description = "Standardized error structure returned by `GlobalExceptionHandler` across all API failures.")
public record ErrorResponse(
    @Schema(description = "Unix epoch timestamp in milliseconds when the error occurred", example = "1721674800000")
    long timestamp,

    @Schema(description = "HTTP status code integer", example = "400")
    int status,

    @Schema(description = "HTTP status reason phrase", example = "Bad Request")
    String error,

    @Schema(description = "Human-readable error description or summary", example = "Validation failed")
    String message,

    @Schema(description = "Request URI path that triggered the error", example = "/djp/api/v1/issues")
    String path,

    @Schema(description = "MDC correlation trace ID for distributed debugging across microservices and frontend", example = "cor-99a8b7c6")
    String correlationId,

    @Schema(description = "Map of field-level validation errors (if applicable)", example = "{\"title\": \"Title must not exceed 255 characters\"}")
    Map<String, String> validationErrors
) {}
