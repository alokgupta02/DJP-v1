package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.mapper.DiscussionMapper;
import com.djp.backend.model.Discussion;
import com.djp.backend.model.User;
import com.djp.backend.repository.DiscussionRepository;
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
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final UserRepository userRepository;
    private final DiscussionMapper discussionMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final AuthUtils authUtils;

    public DiscussionService(DiscussionRepository discussionRepository, UserRepository userRepository, DiscussionMapper discussionMapper, 
                             AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService, AuthUtils authUtils) {
        this.discussionRepository = discussionRepository;
        this.userRepository = userRepository;
        this.discussionMapper = discussionMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.authUtils = authUtils;
    }


    /**
     * Retrieves discussions from the system.
     */
    @Transactional(readOnly = true)
    public Page<DiscussionResponseDto> getDiscussions(Pageable pageable) {
        return discussionRepository.findAll(pageable).map(discussionMapper::toDto);
    }

    /**
     * Retrieves discussion by id from the system.
     */
    @Transactional(readOnly = true)
    public Optional<DiscussionResponseDto> getDiscussionById(UUID id) {
        return discussionRepository.findById(id).map(discussionMapper::toDto);
    }

    /**
     * Creates and persists new discussion.
     */
    @com.djp.backend.aspect.AuditLog(action = "CREATE_DISCUSSION", entityType = "Discussion")
    public DiscussionResponseDto createDiscussion(DiscussionCreateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = new Discussion();
        discussion.setAuthor(author);
        discussion.setTitle(request.title());
        discussion.setDescription(request.description());
        discussion.setCategory(request.category());
        discussion.setProposalPreview(request.proposalPreview());
        discussion.setProposalBadge(request.proposalBadge());
        discussion.setLocation(request.location());
        discussion.setLatitude(request.latitude());
        discussion.setLongitude(request.longitude());
        discussion.setGovLevel(request.govLevel());

        Discussion saved = discussionRepository.save(discussion);
        sqlFilePersistenceService.appendDiscussion(saved);
        return discussionMapper.toDto(saved);
    }

    /**
     * Updates existing discussion records.
     */
    @com.djp.backend.aspect.AuditLog(action = "UPDATE_DISCUSSION", entityType = "Discussion")
    public DiscussionResponseDto updateDiscussion(UUID id, com.djp.backend.dto.DiscussionUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_DISCUSSION_NOT_FOUND));
        
        if (!discussion.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_UPDATE_THIS_DISCUSSION);
        }

        if (request.title() != null) discussion.setTitle(request.title());
        if (request.content() != null) discussion.setDescription(request.content()); // Assuming content maps to description based on typical usage, wait, Create uses description
        if (request.category() != null) discussion.setCategory(request.category());
        if (request.location() != null) discussion.setLocation(request.location());
        if (request.latitude() != null) discussion.setLatitude(request.latitude());
        if (request.longitude() != null) discussion.setLongitude(request.longitude());
        if (request.govLevel() != null) discussion.setGovLevel(request.govLevel());

        return discussionMapper.toDto(discussionRepository.save(discussion));
    }

    /**
     * Deletes discussion from the system.
     */
    @com.djp.backend.aspect.AuditLog(action = "DELETE_DISCUSSION", entityType = "Discussion")
    public void deleteDiscussion(UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_DISCUSSION_NOT_FOUND));
        
        if (!discussion.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_DELETE_THIS_DISCUSSION);
        }
        
        discussionRepository.delete(discussion);
    }
}
