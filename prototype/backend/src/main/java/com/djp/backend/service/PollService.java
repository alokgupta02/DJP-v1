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

        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_POLL",
                "Poll",
                saved.getId().toString(),
                "Question: " + saved.getQuestion() + ", Category: " + saved.getCategory()
        );

        sqlFilePersistenceService.appendPoll(saved);

        return pollMapper.toDto(saved);
    }
}
