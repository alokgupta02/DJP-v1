package com.djp.backend.service;

import com.djp.backend.model.AuditLog;
import com.djp.backend.repository.AuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditLogService {

    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    /**
     * Executes the log operation for action.
     */
    @Transactional
    public AuditLog logAction(String userId, String action, String targetType, String targetId, String details) {
        log.info("AUDIT_LOG - User: {}, Action: {}, TargetType: {}, TargetId: {}, Details: {}",
                userId, action, targetType, targetId, details);

        AuditLog auditLog = new AuditLog(userId, action, targetType, targetId, details);
        return auditLogRepository.save(auditLog);
    }
}
