package com.djp.backend.service;

import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.mapper.DiscussionMapper;
import com.djp.backend.model.Discussion;
import com.djp.backend.model.User;
import com.djp.backend.repository.DiscussionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final DiscussionMapper discussionMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public DiscussionService(DiscussionRepository discussionRepository, DiscussionMapper discussionMapper, 
                             AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService) {
        this.discussionRepository = discussionRepository;
        this.discussionMapper = discussionMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @Transactional(readOnly = true)
    public Page<DiscussionResponseDto> getDiscussions(Pageable pageable) {
        return discussionRepository.findAll(pageable).map(discussionMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<DiscussionResponseDto> getDiscussionById(UUID id) {
        return discussionRepository.findById(id).map(discussionMapper::toDto);
    }

    public DiscussionResponseDto createDiscussion(DiscussionCreateRequestDto request, User author) {
        Discussion discussion = new Discussion();
        discussion.setAuthor(author);
        discussion.setTitle(request.title());
        discussion.setDescription(request.description());
        discussion.setCategory(request.category());
        discussion.setAuthor(author);
        discussion.setProposalPreview(request.proposalPreview());
        discussion.setProposalBadge(request.proposalBadge());
        discussion.setLocation(request.location());
        discussion.setLatitude(request.latitude());
        discussion.setLongitude(request.longitude());
        discussion.setGovLevel(request.govLevel());

        Discussion saved = discussionRepository.save(discussion);

        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_DISCUSSION",
                "Discussion",
                saved.getId().toString(),
                "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
        );

        sqlFilePersistenceService.appendDiscussion(saved);

        return discussionMapper.toDto(saved);
    }
}
