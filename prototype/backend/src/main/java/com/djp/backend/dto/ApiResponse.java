package com.djp.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.domain.Page;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
    boolean success,
    int statusCode,
    String message,
    T data,
    PaginationMeta meta,
    List<ValidationError> errors
) {
    public record ValidationError(String field, String message) {}

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, 200, message, data, null, null);
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, 200, "Success", data, null, null);
    }
    
    public static <T> ApiResponse<List<T>> success(Page<T> page, String message) {
        PaginationMeta meta = new PaginationMeta(
            page.getNumber() + 1,
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages()
        );
        return new ApiResponse<>(true, 200, message, page.getContent(), meta, null);
    }

    public static <T> ApiResponse<List<T>> success(Page<T> page) {
        return success(page, "Success");
    }

    public static <T> ApiResponse<T> error(int statusCode, String message, List<ValidationError> errors) {
        return new ApiResponse<>(false, statusCode, message, null, null, errors);
    }

    public static <T> ApiResponse<T> error(int statusCode, String message) {
        return new ApiResponse<>(false, statusCode, message, null, null, null);
    }
}
