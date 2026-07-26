package com.djp.backend;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public abstract class BaseIntegrationTest {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @AfterEach
    public void cleanupDatabase() {
        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY FALSE");
        jdbcTemplate.execute("TRUNCATE TABLE audit_logs");
        jdbcTemplate.execute("TRUNCATE TABLE notifications");
        jdbcTemplate.execute("TRUNCATE TABLE follows");
        jdbcTemplate.execute("TRUNCATE TABLE comments");
        jdbcTemplate.execute("TRUNCATE TABLE votes");
        jdbcTemplate.execute("TRUNCATE TABLE polls");
        jdbcTemplate.execute("TRUNCATE TABLE discussions");
        jdbcTemplate.execute("TRUNCATE TABLE issues");
        jdbcTemplate.execute("TRUNCATE TABLE users");
        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY TRUE");
    }

}
