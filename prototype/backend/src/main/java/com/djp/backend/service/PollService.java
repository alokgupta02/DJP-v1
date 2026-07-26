package com.djp.backend.service;

import com.djp.backend.dto.PollCreateRequestDto;
import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.mapper.PollMapper;
import com.djp.backend.model.Poll;
import com.djp.backend.model.User;
import com.djp.backend.repository.PollRepository;
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
    private final PollMapper pollMapper;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public PollService(PollRepository pollRepository, PollMapper pollMapper, 
                       AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService) {
        this.pollRepository = pollRepository;
        this.pollMapper = pollMapper;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @Transactional(readOnly = true)
    public Page<PollResponseDto> getPolls(Pageable pageable) {
        return pollRepository.findAll(pageable).map(pollMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<PollResponseDto> getPollById(UUID id) {
        return pollRepository.findById(id).map(pollMapper::toDto);
    }

    @com.djp.backend.aspect.AuditLog(action = "CREATE_POLL", entityType = "Poll")
    public PollResponseDto createPoll(PollCreateRequestDto request, User author) {
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

    @com.djp.backend.aspect.AuditLog(action = "UPDATE_POLL", entityType = "Poll")
    public PollResponseDto updatePoll(UUID id, com.djp.backend.dto.PollUpdateRequestDto request, User author) {
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found"));
        
        if (!poll.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException("Not authorized to update this poll");
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

    @com.djp.backend.aspect.AuditLog(action = "DELETE_POLL", entityType = "Poll")
    public void deletePoll(UUID id, User author) {
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found"));
        
        if (!poll.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException("Not authorized to delete this poll");
        }
        
        pollRepository.delete(poll);
    }
}
