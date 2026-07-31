package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.mapper.IssueMapper;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.util.AuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final AuthUtils authUtils;

    public IssueService(IssueRepository issueRepository, IssueMapper issueMapper, 
                        SqlFilePersistenceService sqlFilePersistenceService, AuthUtils authUtils) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.authUtils = authUtils;
    }


    /**
     * Retrieves issues from the system.
     */
    @Transactional(readOnly = true)
    public Page<IssueResponseDto> getIssues(@NonNull Pageable pageable) {
        return issueRepository.findAll(pageable).map(issueMapper::toDto);
    }

    /**
     * Retrieves issue by id from the system.
     */
    @Transactional(readOnly = true)
    public Optional<IssueResponseDto> getIssueById(@NonNull UUID id) {
        return issueRepository.findById(id).map(issueMapper::toDto);
    }

    /**
     * Creates and persists new issue.
     */
    @com.djp.backend.aspect.AuditLog(action = "CREATE_ISSUE", entityType = "Issue")
    public IssueResponseDto createIssue(IssueCreateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = issueMapper.toEntity(request);
        issue.setAuthor(author);

        Issue saved = issueRepository.save(issue);
        sqlFilePersistenceService.appendIssue(saved);
        return issueMapper.toDto(saved);
    }

    /**
     * Updates existing issue records.
     */
    @com.djp.backend.aspect.AuditLog(action = "UPDATE_ISSUE", entityType = "Issue")
    public IssueResponseDto updateIssue(@NonNull UUID id, com.djp.backend.dto.IssueUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_ISSUE_NOT_FOUND));
        
        if (!issue.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_UPDATE_THIS_ISSUE);
        }

        issueMapper.updateIssueFromDto(request, issue);

        return issueMapper.toDto(issueRepository.save(issue));
    }

    /**
     * Deletes issue from the system.
     */
    @com.djp.backend.aspect.AuditLog(action = "DELETE_ISSUE", entityType = "Issue")
    public void deleteIssue(@NonNull UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_ISSUE_NOT_FOUND));
        
        if (!issue.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_DELETE_THIS_ISSUE);
        }
        
        issueRepository.delete(issue);
    }
}
