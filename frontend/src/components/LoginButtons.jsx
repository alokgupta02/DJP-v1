import React from 'react';

export default function LoginButtons() {
  const handleOAuthLogin = (provider) => {
    // Redirects to Spring Boot backend OAuth initiation
    window.location.href = `/api/v1/auth/${provider}`;
  };

  return (
    <div className="login-buttons-container" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <button
        id="google-login-btn"
        onClick={() => handleOAuthLogin('google')}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
      >
        Continue with Google
      </button>

      <button
        id="github-login-btn"
        onClick={() => handleOAuthLogin('github')}
        style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
      >
        Continue with GitHub
      </button>
    </div>
  );
}
