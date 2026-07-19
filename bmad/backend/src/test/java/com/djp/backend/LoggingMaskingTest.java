package com.djp.backend;

import com.djp.backend.logging.MaskingMessageConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class LoggingMaskingTest {

    @Test
    public void testEmailMasking() {
        MaskingMessageConverter converter = new MaskingMessageConverter();
        ILoggingEvent event = Mockito.mock(ILoggingEvent.class);

        when(event.getFormattedMessage()).thenReturn("User email is john.doe@example.com and user is active");
        String result = converter.convert(event);
        assertEquals("User email is j***e@example.com and user is active", result);
    }

    @Test
    public void testJsonSensitiveKeysMasking() {
        MaskingMessageConverter converter = new MaskingMessageConverter();
        ILoggingEvent event = Mockito.mock(ILoggingEvent.class);

        when(event.getFormattedMessage()).thenReturn("Request payload: {\"username\":\"jane\", \"password\":\"secretPass123\", \"token\":\"jwt.token.here\"}");
        String result = converter.convert(event);
        assertEquals("Request payload: {\"username\":\"jane\", \"password\":\"***\", \"token\":\"***\"}", result);
    }

    @Test
    public void testKeyValueSensitiveKeysMasking() {
        MaskingMessageConverter converter = new MaskingMessageConverter();
        ILoggingEvent event = Mockito.mock(ILoggingEvent.class);

        when(event.getFormattedMessage()).thenReturn("AuthParams(username=jane, password=secretPass123, token=jwt.token.here)");
        String result = converter.convert(event);
        assertEquals("AuthParams(username=jane, password=***, token=***)", result);
    }
}
