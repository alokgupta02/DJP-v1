package com.djp.backend.dto;

import jakarta.validation.constraints.Min;

public record CastVoteRequest(
    @Min(value = 0, message = "Option index must be >= 0")
    int optionIndex
) {}
