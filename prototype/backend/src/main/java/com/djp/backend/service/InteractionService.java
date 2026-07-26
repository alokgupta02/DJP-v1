package com.djp.backend.service;

import com.djp.backend.model.*;
import com.djp.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InteractionService {

    private final CommentRepository commentRepository;
    private final VoteRepository voteRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public InteractionService(CommentRepository commentRepository,
                              VoteRepository voteRepository,
                              FollowRepository followRepository,
                              UserRepository userRepository,
                              NotificationService notificationService) {
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
        this.followRepository = followRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public Comment addComment(String content, UUID entityId, String entityType, UUID parentId, UUID authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setEntityId(entityId);
        comment.setEntityType(entityType);
        comment.setAuthor(author);

        if (parentId != null) {
            Comment parent = commentRepository.findById(parentId)
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            comment.setParentComment(parent);
        }

        Comment saved = commentRepository.save(comment);

        if (parentId != null) {
            // Notify parent comment author
            notificationService.createNotification(saved.getParentComment().getAuthor(), author, "REPLY", saved.getId());
        } else {
            // Depending on entityType, we might want to notify the issue/discussion author here
            // This is a placeholder for that logic if we load the entity
        }

        return saved;
    }

    public List<Comment> getComments(UUID entityId, String entityType) {
        return commentRepository.findByEntityIdAndEntityTypeOrderByCreatedAtAsc(entityId, entityType);
    }

    @Transactional
    public Vote toggleVote(UUID entityId, String entityType, int value, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Vote> existing = voteRepository.findByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
        if (existing.isPresent()) {
            Vote vote = existing.get();
            if (vote.getValue() == value) {
                // Clicking same vote removes it
                voteRepository.delete(vote);
                return null; // indicates removed
            } else {
                // Changing vote
                vote.setValue(value);
                return voteRepository.save(vote);
            }
        } else {
            // New vote
            Vote vote = new Vote();
            vote.setUser(user);
            vote.setEntityId(entityId);
            vote.setEntityType(entityType);
            vote.setValue(value);
            return voteRepository.save(vote);
        }
    }

    @Transactional
    public Follow toggleFollow(UUID targetId, String targetType, UUID followerId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("Follower not found"));

        Optional<Follow> existing = followRepository.findByFollowerIdAndTargetIdAndTargetType(followerId, targetId, targetType);
        
        if (existing.isPresent()) {
            followRepository.delete(existing.get());
            return null;
        } else {
            Follow follow = new Follow();
            follow.setFollower(follower);
            follow.setTargetId(targetId);
            follow.setTargetType(targetType);
            
            Follow saved = followRepository.save(follow);
            
            if ("USER".equals(targetType)) {
                User targetUser = userRepository.findById(targetId).orElse(null);
                if (targetUser != null) {
                    notificationService.createNotification(targetUser, follower, "FOLLOW", saved.getId());
                }
            }
            
            return saved;
        }
    }
}
