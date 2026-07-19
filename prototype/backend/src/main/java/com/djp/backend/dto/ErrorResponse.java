package com.djp.backend.dto;

import java.util.Map;

public record ErrorResponse(
    long timestamp,
    int status,
    String error,
    String message,
    String path,
    String correlationId,
    Map<String, String> validationErrors
) {}
