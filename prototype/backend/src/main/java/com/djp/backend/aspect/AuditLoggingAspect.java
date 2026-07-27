package com.djp.backend.aspect;

import com.djp.backend.model.User;
import com.djp.backend.service.AuditLogService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.UUID;

@Aspect
@Component
public class AuditLoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(AuditLoggingAspect.class);
    private final AuditLogService auditLogService;

    public AuditLoggingAspect(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @AfterReturning(pointcut = "@annotation(auditLog)", returning = "result")
    public void logAuditActivity(JoinPoint joinPoint, AuditLog auditLog, Object result) {
        try {
            User author = extractAuthor(joinPoint.getArgs());
            if (author == null) {
                log.warn("Could not find User author in arguments for AuditLog on {}", joinPoint.getSignature());
                return;
            }

            String entityId = extractId(result);
            if (entityId == null) {
                log.warn("Could not extract ID from returned object {} for AuditLog", result.getClass().getSimpleName());
                return;
            }

            auditLogService.logAction(
                    author.getId().toString(),
                    auditLog.action(),
                    auditLog.entityType(),
                    entityId,
                    "Executed " + joinPoint.getSignature().getName()
            );

        } catch (Exception e) {
            log.error("Failed to execute audit logging aspect", e);
        }
    }

    private User extractAuthor(Object[] args) {
        for (Object arg : args) {
            if (arg instanceof User) {
                return (User) arg;
            }
        }
        return null;
    }

    private String extractId(Object obj) {
        if (obj == null) return null;
        try {
            Field idField = obj.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            Object id = idField.get(obj);
            return id != null ? id.toString() : null;
        } catch (NoSuchFieldException e) {
            // Check if it's a DTO that might not have a direct id field, or try getter
            try {
                var method = obj.getClass().getMethod("getId");
                Object id = method.invoke(obj);
                return id != null ? id.toString() : null;
            } catch (Exception ex) {
                return null;
            }
        } catch (IllegalAccessException e) {
            return null;
        }
    }
}
