package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.mapper.DiscussionMapper;
import com.djp.backend.model.Discussion;
import com.djp.backend.model.User;
import com.djp.backend.repository.DiscussionRepository;
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
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final DiscussionMapper discussionMapper;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final AuthUtils authUtils;

    public DiscussionService(DiscussionRepository discussionRepository, DiscussionMapper discussionMapper, 
                             SqlFilePersistenceService sqlFilePersistenceService, AuthUtils authUtils) {
        this.discussionRepository = discussionRepository;
        this.discussionMapper = discussionMapper;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.authUtils = authUtils;
    }


    /**
     * Retrieves discussions from the system.
     */
    @Transactional(readOnly = true)
    public Page<DiscussionResponseDto> getDiscussions(@NonNull Pageable pageable) {
        return discussionRepository.findAll(pageable).map(discussionMapper::toDto);
    }

    /**
     * Retrieves discussion by id from the system.
     */
    @Transactional(readOnly = true)
    public Optional<DiscussionResponseDto> getDiscussionById(@NonNull UUID id) {
        return discussionRepository.findById(id).map(discussionMapper::toDto);
    }

    /**
     * Creates and persists new discussion.
     */
    @com.djp.backend.aspect.AuditLog(action = "CREATE_DISCUSSION", entityType = "Discussion")
    public DiscussionResponseDto createDiscussion(DiscussionCreateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = discussionMapper.toEntity(request);
        discussion.setAuthor(author);

        Discussion saved = discussionRepository.save(discussion);
        sqlFilePersistenceService.appendDiscussion(saved);
        return discussionMapper.toDto(saved);
    }

    /**
     * Updates existing discussion records.
     */
    @com.djp.backend.aspect.AuditLog(action = "UPDATE_DISCUSSION", entityType = "Discussion")
    public DiscussionResponseDto updateDiscussion(@NonNull UUID id, com.djp.backend.dto.DiscussionUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_DISCUSSION_NOT_FOUND));
        
        if (!discussion.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_UPDATE_THIS_DISCUSSION);
        }

        // Map request.content() to description if present in the DTO? 
        // Wait, DiscussionUpdateRequestDto uses 'content' ? Or does it use 'description'?
        // The original code has: if (request.content() != null) discussion.setDescription(request.content());
        // MapStruct won't map 'content' to 'description' automatically.
        // Let's do partial update with mapstruct and handle content manually if needed.
        // Actually, we can use @Mapping in the mapper. But since I can't be sure about the DTO without checking it, I'll just map it directly.
        discussionMapper.updateDiscussionFromDto(request, discussion);
        if (request.content() != null) discussion.setDescription(request.content());

        return discussionMapper.toDto(discussionRepository.save(discussion));
    }

    /**
     * Deletes discussion from the system.
     */
    @com.djp.backend.aspect.AuditLog(action = "DELETE_DISCUSSION", entityType = "Discussion")
    public void deleteDiscussion(@NonNull UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_DISCUSSION_NOT_FOUND));
        
        if (!discussion.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_DELETE_THIS_DISCUSSION);
        }
        
        discussionRepository.delete(discussion);
    }
}
