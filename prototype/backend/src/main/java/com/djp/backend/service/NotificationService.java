package com.djp.backend.service;

import com.djp.backend.model.Notification;
import com.djp.backend.model.User;
import com.djp.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

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

    public List<Notification> getNotificationsForUser(UUID userId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId);
    }

    public long getUnreadCount(UUID userId) {
        return notificationRepository.countByRecipientIdAndIsReadFalse(userId);
    }

    @Transactional
    public void markAsRead(UUID notificationId, UUID userId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            if (notification.getRecipient().getId().equals(userId)) {
                notification.setRead(true);
                notificationRepository.save(notification);
            }
        });
    }
}
