package com.djp.backend;

import com.djp.backend.repository.DiscussionRepository;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.PollRepository;
import com.djp.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles({"local", "dummy"})
public class StartupSeedDataIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private PollRepository pollRepository;

    @Test
    public void startup_autoPopulatesSeedDataFromSqlFiles() {
        org.junit.jupiter.api.Assertions.assertTrue(userRepository.count() >= 2, "Users should be auto-populated from data/users.sql on startup");
        org.junit.jupiter.api.Assertions.assertTrue(issueRepository.count() >= 2, "Issues should be auto-populated from data/issues.sql on startup");
        org.junit.jupiter.api.Assertions.assertTrue(discussionRepository.count() >= 2, "Discussions should be auto-populated from data/discussions.sql on startup");
        org.junit.jupiter.api.Assertions.assertTrue(pollRepository.count() >= 2, "Polls should be auto-populated from data/polls.sql on startup");
    }
}
