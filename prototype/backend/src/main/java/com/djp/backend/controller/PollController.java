package com.djp.backend.controller;

import com.djp.backend.dto.PollCreateRequestDto;
import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.PollService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/polls")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PollController {

    private final PollService pollService;
    private final UserRepository userRepository;

    public PollController(PollService pollService, UserRepository userRepository) {
        this.pollService = pollService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Page<PollResponseDto>> getAllPolls(Pageable pageable) {
        return ResponseEntity.ok(pollService.getPolls(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PollResponseDto> getPollById(@PathVariable UUID id) {
        return pollService.getPollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PollResponseDto> createPoll(
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

        PollResponseDto saved = pollService.createPoll(request, author);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
