package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import org.springframework.security.core.Authentication;
import com.djp.backend.util.AuthUtils;
import com.djp.backend.model.Comment;
import com.djp.backend.model.Vote;
import com.djp.backend.model.Follow;
import com.djp.backend.model.User;
import com.djp.backend.repository.CommentRepository;
import com.djp.backend.repository.VoteRepository;
import com.djp.backend.repository.FollowRepository;
import com.djp.backend.repository.UserRepository;
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
    private final AuthUtils authUtils;

    public InteractionService(CommentRepository commentRepository,
                              VoteRepository voteRepository,
                              FollowRepository followRepository,
                              UserRepository userRepository,
                              NotificationService notificationService, AuthUtils authUtils) {
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
        this.followRepository = followRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.authUtils = authUtils;
    }


    /**
     * Creates and persists new comment.
     */
    @Transactional
    public Comment addComment(String content, UUID entityId, String entityType, UUID parentId, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setEntityId(entityId);
        comment.setEntityType(entityType);
        comment.setAuthor(author);

        if (parentId != null) {
            Comment parent = commentRepository.findById(parentId)
                    .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PARENT_COMMENT_NOT_FOUND));
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

    /**
     * Retrieves comments from the system.
     */
    public List<Comment> getComments(UUID entityId, String entityType) {
        return commentRepository.findByEntityIdAndEntityTypeOrderByCreatedAtAsc(entityId, entityType);
    }

    /**
     * Executes the toggle operation for vote.
     */
    @Transactional
    public Vote toggleVote(UUID entityId, String entityType, int voteValue, Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        UUID userId = user.getId();

        Optional<Vote> existing = voteRepository.findByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
        if (existing.isPresent()) {
            Vote vote = existing.get();
            if (vote.getVoteValue() == voteValue) {
                // Clicking same vote removes it
                voteRepository.delete(vote);
                return null; // indicates removed
            } else {
                // Changing vote
                vote.setVoteValue(voteValue);
                return voteRepository.save(vote);
            }
        } else {
            // New vote
            Vote vote = new Vote();
            vote.setUser(user);
            vote.setEntityId(entityId);
            vote.setEntityType(entityType);
            vote.setVoteValue(voteValue);
            return voteRepository.save(vote);
        }
    }

    /**
     * Executes the toggle operation for follow.
     */
    @Transactional
    public Follow toggleFollow(UUID targetId, String targetType, Authentication authentication) {
        User follower = authUtils.getAuthenticatedUser(authentication);
        UUID followerId = follower.getId();

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
