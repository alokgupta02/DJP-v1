package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.model.Notification;
import com.djp.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@Tag(name = "9. Notifications", description = "Notifications Management")
@RequestMapping("/djp/api/v1/notifications")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Operation(summary = "Get Notifications", description = "Executes the getNotifications operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                notificationService.getNotificationsForUser(authentication), "Notifications retrieved successfully."));
    }

    @Operation(summary = "Get Unread Count", description = "Executes the getUnreadCount operation")
    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount(Authentication authentication) {
        long count = notificationService.getUnreadCount(authentication);
        return ResponseEntity.ok(ApiResponse.success(Map.of("count", count), "Unread count retrieved successfully."));
    }

    @Operation(summary = "Mark As Read", description = "Executes the markAsRead operation")
    @PostMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable UUID id, Authentication authentication) {
        notificationService.markAsRead(id, authentication);
        return ResponseEntity.ok(ApiResponse.success((Void) null, "Notification marked as read."));
    }
}
