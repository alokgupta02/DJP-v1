package com.djp.backend.service;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.mapper.IssueMapper;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
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
    private final IssueMapper issueMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public IssueService(IssueRepository issueRepository, IssueMapper issueMapper, 
                        AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService) {
        this.issueRepository = issueRepository;
        this.issueMapper = issueMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @Transactional(readOnly = true)
    public Page<IssueResponseDto> getIssues(Pageable pageable) {
        return issueRepository.findAll(pageable).map(issueMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<IssueResponseDto> getIssueById(UUID id) {
        return issueRepository.findById(id).map(issueMapper::toDto);
    }

    public IssueResponseDto createIssue(IssueCreateRequestDto request, User author) {
        Issue issue = new Issue(
                author,
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority()
        );
        issue.setLocation(request.getLocation());
        issue.setLatitude(request.getLatitude());
        issue.setLongitude(request.getLongitude());
        issue.setGovLevel(request.getGovLevel());

        Issue saved = issueRepository.save(issue);

        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_ISSUE",
                "Issue",
                saved.getId().toString(),
                "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
        );

        sqlFilePersistenceService.appendIssue(saved);

        return issueMapper.toDto(saved);
    }
}
