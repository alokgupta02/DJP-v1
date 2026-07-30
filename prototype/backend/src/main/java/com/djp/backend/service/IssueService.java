package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.mapper.IssueMapper;
import com.djp.backend.exception.UnauthorizedException;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final IssueMapper issueMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final AuthUtils authUtils;

    public IssueService(IssueRepository issueRepository, UserRepository userRepository, IssueMapper issueMapper, 
                        AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService, AuthUtils authUtils) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.issueMapper = issueMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.authUtils = authUtils;
    }


    /**
     * Retrieves issues from the system.
     */
    @Transactional(readOnly = true)
    public Page<IssueResponseDto> getIssues(Pageable pageable) {
        return issueRepository.findAll(pageable).map(issueMapper::toDto);
    }

    /**
     * Retrieves issue by id from the system.
     */
    @Transactional(readOnly = true)
    public Optional<IssueResponseDto> getIssueById(UUID id) {
        return issueRepository.findById(id).map(issueMapper::toDto);
    }

    /**
     * Creates and persists new issue.
     */
    @com.djp.backend.aspect.AuditLog(action = "CREATE_ISSUE", entityType = "Issue")
    public IssueResponseDto createIssue(IssueCreateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = new Issue(
                author,
                request.title(),
                request.description(),
                request.category(),
                request.priority()
        );
        issue.setLocation(request.location());
        issue.setLatitude(request.latitude());
        issue.setLongitude(request.longitude());
        issue.setGovLevel(request.govLevel());

        Issue saved = issueRepository.save(issue);
        sqlFilePersistenceService.appendIssue(saved);
        return issueMapper.toDto(saved);
    }

    /**
     * Updates existing issue records.
     */
    @com.djp.backend.aspect.AuditLog(action = "UPDATE_ISSUE", entityType = "Issue")
    public IssueResponseDto updateIssue(UUID id, com.djp.backend.dto.IssueUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_ISSUE_NOT_FOUND));
        
        if (!issue.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_UPDATE_THIS_ISSUE);
        }

        if (request.title() != null) issue.setTitle(request.title());
        if (request.description() != null) issue.setDescription(request.description());
        if (request.category() != null) issue.setCategory(request.category());
        if (request.priority() != null) issue.setPriority(request.priority());
        if (request.location() != null) issue.setLocation(request.location());
        if (request.latitude() != null) issue.setLatitude(request.latitude());
        if (request.longitude() != null) issue.setLongitude(request.longitude());
        if (request.govLevel() != null) issue.setGovLevel(request.govLevel());

        return issueMapper.toDto(issueRepository.save(issue));
    }

    /**
     * Deletes issue from the system.
     */
    @com.djp.backend.aspect.AuditLog(action = "DELETE_ISSUE", entityType = "Issue")
    public void deleteIssue(UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_ISSUE_NOT_FOUND));
        
        if (!issue.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_DELETE_THIS_ISSUE);
        }
        
        issueRepository.delete(issue);
    }
}
