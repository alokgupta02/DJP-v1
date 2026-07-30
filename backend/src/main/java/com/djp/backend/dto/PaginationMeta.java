package com.djp.backend.dto;

public record PaginationMeta(
    int currentPage,
    int perPage,
    long totalItems,
    int totalPages
) {}
