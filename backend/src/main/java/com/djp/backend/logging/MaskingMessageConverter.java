package com.djp.backend.logging;

import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MaskingMessageConverter extends ClassicConverter {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+\\.[a-zA-Z]{2,})");
    private static final Pattern JSON_PASSWORD_PATTERN = Pattern.compile("(?i)\"(password|token|authorization|clientSecret|client_secret|client-secret)\"\\s*:\\s*\"([^\"]+)\"");
    private static final Pattern KV_PASSWORD_PATTERN = Pattern.compile("(?i)(password|token|authorization|clientSecret|client_secret|client-secret)\\s*=\\s*([^,\\s\\)]+)");

    @Override
    public String convert(ILoggingEvent event) {
        String message = event.getFormattedMessage();
        if (message == null) {
            return null;
        }

        // Mask emails (e.g. jane.doe@example.com -> j***e@example.com)
        try {
            Matcher emailMatcher = EMAIL_PATTERN.matcher(message);
            StringBuilder sb = new StringBuilder();
            while (emailMatcher.find()) {
                String localPart = emailMatcher.group(1);
                String domain = emailMatcher.group(2);
                String maskedLocal;
                if (localPart.length() <= 2) {
                    maskedLocal = "***";
                } else {
                    maskedLocal = localPart.charAt(0) + "***" + localPart.charAt(localPart.length() - 1);
                }
                emailMatcher.appendReplacement(sb, maskedLocal + "@" + domain);
            }
            emailMatcher.appendTail(sb);
            message = sb.toString();
        } catch (Exception e) {
            // Fallback to original message if regex error
        }

        // Mask JSON keys (e.g. "password" : "secret" -> "password" : "***")
        try {
            Matcher jsonMatcher = JSON_PASSWORD_PATTERN.matcher(message);
            StringBuilder sb = new StringBuilder();
            while (jsonMatcher.find()) {
                String key = jsonMatcher.group(1);
                jsonMatcher.appendReplacement(sb, "\"" + key + "\":\"***\"");
            }
            jsonMatcher.appendTail(sb);
            message = sb.toString();
        } catch (Exception e) {
            // Fallback to original
        }

        // Mask KV keys (e.g. password=secret -> password=***)
        try {
            Matcher kvMatcher = KV_PASSWORD_PATTERN.matcher(message);
            StringBuilder sb = new StringBuilder();
            while (kvMatcher.find()) {
                String key = kvMatcher.group(1);
                kvMatcher.appendReplacement(sb, key + "=***");
            }
            kvMatcher.appendTail(sb);
            message = sb.toString();
        } catch (Exception e) {
            // Fallback to original
        }

        return message;
    }
}
