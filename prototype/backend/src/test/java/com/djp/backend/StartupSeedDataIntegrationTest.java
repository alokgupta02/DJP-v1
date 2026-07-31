package com.djp.backend;

import com.djp.backend.repository.DiscussionRepository;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.PollRepository;
import com.djp.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies that seed SQL files auto-populate the database on startup.
 * Uses its own isolated H2 database (djptest_seed) so TRUNCATE operations
 * from other tests don't wipe the seed data before assertions run.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestPropertySource(properties = "spring.datasource.url=jdbc:h2:mem:djptest_seed;DB_CLOSE_DELAY=-1;MODE=PostgreSQL")
public class StartupSeedDataIntegrationTest {

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
        assertTrue(userRepository.count() >= 2, "Users should be auto-populated from data/users.sql on startup");
        assertTrue(issueRepository.count() >= 2, "Issues should be auto-populated from data/issues.sql on startup");
        assertTrue(discussionRepository.count() >= 2, "Discussions should be auto-populated from data/discussions.sql on startup");
        assertTrue(pollRepository.count() >= 2, "Polls should be auto-populated from data/polls.sql on startup");
    }
}
