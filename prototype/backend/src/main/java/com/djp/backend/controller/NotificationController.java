package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.model.Notification;
import com.djp.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/notifications")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(ApiResponse.success(notificationService.getNotificationsForUser(userId), "Notifications retrieved successfully."));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount(@AuthenticationPrincipal UUID userId) {
        long count = notificationService.getUnreadCount(userId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("count", count), "Unread count retrieved successfully."));
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable UUID id, @AuthenticationPrincipal UUID userId) {
        notificationService.markAsRead(id, userId);
        return ResponseEntity.ok(ApiResponse.success((Void) null, "Notification marked as read."));
    }
}
