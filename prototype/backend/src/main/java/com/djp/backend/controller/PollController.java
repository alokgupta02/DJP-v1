package com.djp.backend.controller;

import com.djp.backend.dto.PollCreateRequestDto;
import com.djp.backend.model.Poll;
import com.djp.backend.model.User;
import com.djp.backend.repository.PollRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.AuditLogService;
import com.djp.backend.service.SqlFilePersistenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/polls")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PollController {

    private final PollRepository pollRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public PollController(PollRepository pollRepository, UserRepository userRepository, AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService) {
        this.pollRepository = pollRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @GetMapping
    public ResponseEntity<List<Poll>> getAllPolls() {
        return ResponseEntity.ok(pollRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable UUID id) {
        return pollRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Poll> createPoll(
            @Valid @RequestBody PollCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User author = userRepository.findByEmail(email).orElse(null);

        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Poll poll = new Poll(
                author,
                request.question(),
                request.description(),
                request.category(),
                request.optionsJson()
        );
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

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
