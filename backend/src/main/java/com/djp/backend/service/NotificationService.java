package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.model.Notification;
import com.djp.backend.exception.UnauthorizedException;
import com.djp.backend.model.User;
import com.djp.backend.repository.NotificationRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final AuthUtils authUtils;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository, AuthUtils authUtils) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.authUtils = authUtils;
    }


    /**
     * Creates and persists new notification.
     */
    @Transactional
    public void createNotification(User recipient, User actor, String type, UUID entityId) {
        if (recipient.getId().equals(actor.getId())) {
            // Don't notify users of their own actions
            return;
        }
        
        Notification notification = new Notification();
        notification.setRecipient(recipient);
        notification.setActor(actor);
        notification.setType(type);
        notification.setEntityId(entityId);
        notification.setRead(false);
        
        notificationRepository.save(notification);
    }

    /**
     * Retrieves notifications for user from the system.
     */
    public List<Notification> getNotificationsForUser(Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(user.getId());
    }

    /**
     * Retrieves unread count from the system.
     */
    public long getUnreadCount(Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        return notificationRepository.countByRecipientIdAndIsReadFalse(user.getId());
    }

    /**
     * Executes the mark operation for as read.
     */
    @Transactional
    public void markAsRead(UUID notificationId, Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_NOTIFICATION_NOT_FOUND));

        if (!notification.getRecipient().getId().equals(user.getId())) {
            throw new UnauthorizedException("User not authorized to update this notification.");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
