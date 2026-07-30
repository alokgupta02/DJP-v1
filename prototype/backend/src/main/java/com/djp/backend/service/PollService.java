package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.PollCreateRequestDto;
import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.mapper.PollMapper;
import com.djp.backend.exception.UnauthorizedException;
import com.djp.backend.model.Poll;
import com.djp.backend.model.User;
import com.djp.backend.model.PollVote;
import com.djp.backend.repository.PollRepository;
import com.djp.backend.repository.PollVoteRepository;
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
public class PollService {

    private final PollRepository pollRepository;
    private final PollVoteRepository pollVoteRepository;
    private final UserRepository userRepository;
    private final PollMapper pollMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final AuthUtils authUtils;

    public PollService(PollRepository pollRepository, PollVoteRepository pollVoteRepository, UserRepository userRepository,
                       PollMapper pollMapper, 
                       AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService, AuthUtils authUtils) {
        this.pollRepository = pollRepository;
        this.pollVoteRepository = pollVoteRepository;
        this.userRepository = userRepository;
        this.pollMapper = pollMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.authUtils = authUtils;
    }


    /**
     * Retrieves polls from the system.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional(readOnly = true)
    public Page<PollResponseDto> getPolls(Pageable pageable) {
        return pollRepository.findAll(pageable).map(pollMapper::toDto);
    }

    /**
     * Retrieves poll by id from the system.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional(readOnly = true)
    public Optional<PollResponseDto> getPollById(UUID id) {
        return pollRepository.findById(id).map(pollMapper::toDto);
    }

    /**
     * Creates and persists new poll.
     * Returns the appropriate response or status based on the operation.
     */
    @com.djp.backend.aspect.AuditLog(action = "CREATE_POLL", entityType = "Poll")
    public PollResponseDto createPoll(PollCreateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Poll poll = new Poll();
        poll.setQuestion(request.question());
        poll.setDescription(request.description());
        poll.setCategory(request.category());
        poll.setOptionsJson(request.optionsJson());
        poll.setAuthor(author);
        poll.setLocation(request.location());
        poll.setLatitude(request.latitude());
        poll.setLongitude(request.longitude());
        poll.setGovLevel(request.govLevel());

        Poll saved = pollRepository.save(poll);
        sqlFilePersistenceService.appendPoll(saved);
        return pollMapper.toDto(saved);
    }

    /**
     * Updates existing poll records.
     * Returns the appropriate response or status based on the operation.
     */
    @com.djp.backend.aspect.AuditLog(action = "UPDATE_POLL", entityType = "Poll")
    public PollResponseDto updatePoll(UUID id, com.djp.backend.dto.PollUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_POLL_NOT_FOUND));
        
        if (!poll.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_UPDATE_THIS_POLL);
        }

        if (request.question() != null) poll.setQuestion(request.question());
        if (request.description() != null) poll.setDescription(request.description());
        if (request.category() != null) poll.setCategory(request.category());
        if (request.location() != null) poll.setLocation(request.location());
        if (request.latitude() != null) poll.setLatitude(request.latitude());
        if (request.longitude() != null) poll.setLongitude(request.longitude());
        if (request.govLevel() != null) poll.setGovLevel(request.govLevel());
        if (request.options() != null) {
            try {
                poll.setOptionsJson(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(request.options()));
            } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
                throw new RuntimeException("Failed to serialize options", e);
            }
        }

        return pollMapper.toDto(pollRepository.save(poll));
    }

    /**
     * Executes the cast operation for vote.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional
    public PollResponseDto castVote(UUID pollId, int optionIndex, Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        if (pollVoteRepository.existsByUserIdAndPollId(user.getId(), pollId)) {
            throw new IllegalArgumentException(DjpConstant.MSG_USER_HAS_ALREADY_VOTED_ON_THIS_POLL);
        }
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_POLL_NOT_FOUND));
        pollVoteRepository.save(new PollVote(user, poll, optionIndex));
        poll.setVotesCount(poll.getVotesCount() + 1);
        return pollMapper.toDto(pollRepository.save(poll));
    }

    /**
     * Deletes poll from the system.
     * Returns the appropriate response or status based on the operation.
     */
    @com.djp.backend.aspect.AuditLog(action = "DELETE_POLL", entityType = "Poll")
    public void deletePoll(UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_POLL_NOT_FOUND));
        
        if (!poll.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED_TO_DELETE_THIS_POLL);
        }
        
        pollRepository.delete(poll);
    }
}
