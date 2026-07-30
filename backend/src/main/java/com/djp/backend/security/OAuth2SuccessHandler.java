package com.djp.backend.security;

import com.djp.backend.model.RefreshToken;
import com.djp.backend.model.User;
import com.djp.backend.repository.RefreshTokenRepository;
import com.djp.backend.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final String frontendRedirectUrl;

    public OAuth2SuccessHandler(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            JwtTokenProvider jwtTokenProvider,
            @Value("${app.oauth2.frontend-redirect-url:http://localhost:5173/oauth2/redirect}") String frontendRedirectUrl) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.frontendRedirectUrl = frontendRedirectUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        
        if (response.isCommitted()) {
            log.debug("Response has already been committed. Unable to redirect.");
            return;
        }

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            String provider = oauthToken.getAuthorizedClientRegistrationId().toUpperCase();
            OAuth2User oAuth2User = oauthToken.getPrincipal();

            String providerId = getProviderId(oAuth2User, provider);
            String email = getEmail(oAuth2User);
            String name = getName(oAuth2User);

            if (email == null) {
                email = providerId + "@" + provider.toLowerCase() + ".com";
            }

            log.info("Successfully authenticated user via OAuth2 provider: {} [email: {}]", provider, email);

            User user = syncUserInDatabase(email, name, provider, providerId);

            String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());
            String refreshTokenValue = jwtTokenProvider.createRefreshToken(user.getId());

            RefreshToken refreshToken = new RefreshToken(
                    refreshTokenValue,
                    user,
                    OffsetDateTime.now().plusSeconds(jwtTokenProvider.getRefreshTokenValidityInMilliseconds() / 1000)
            );
            refreshTokenRepository.save(refreshToken);

            String targetUrl = UriComponentsBuilder.fromUriString(frontendRedirectUrl)
                    .queryParam("token", token)
                    .queryParam("refreshToken", refreshTokenValue)
                    .build().toUriString();

            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }

    private String getProviderId(OAuth2User oAuth2User, String provider) {
        if ("GITHUB".equals(provider)) {
            Object id = oAuth2User.getAttribute("id");
            return id != null ? id.toString() : null;
        }
        return oAuth2User.getAttribute("sub"); // Google default
    }

    private String getEmail(OAuth2User oAuth2User) {
        return oAuth2User.getAttribute("email");
    }

    private String getName(OAuth2User oAuth2User) {
        String name = oAuth2User.getAttribute("name");
        if (name == null || name.trim().isEmpty()) {
            name = oAuth2User.getAttribute("login"); // GitHub username fallback
        }
        if (name == null || name.trim().isEmpty()) {
            name = "Citizen";
        }
        return name;
    }

    private User syncUserInDatabase(String email, String name, String provider, String providerId) {
        Optional<User> existingUserOpt = userRepository.findByProviderAndProviderId(provider, providerId);

        if (existingUserOpt.isPresent()) {
            User user = existingUserOpt.get();
            // Update name or email if drifted
            user.setName(name);
            user.setEmail(email);
            return userRepository.save(user);
        }

        // Fallback checks by email to merge accounts if needed
        Optional<User> userByEmailOpt = userRepository.findByEmail(email);
        if (userByEmailOpt.isPresent()) {
            User user = userByEmailOpt.get();
            user.setProvider(provider);
            user.setProviderId(providerId);
            user.setName(name);
            return userRepository.save(user);
        }

        // Create new user record
        User newUser = new User(email, name, provider, providerId);
        newUser.setRole("CITIZEN");
        newUser.setSubscriptionStatus("INACTIVE");
        newUser.setOnboardingCompleted(false);
        return userRepository.save(newUser);
    }
}
