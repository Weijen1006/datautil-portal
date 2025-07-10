describe('PKCE Generator', () => {
  // Helper: base64url encode an ArrayBuffer
  function base64UrlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (const b of bytes) {
      binary += String.fromCharCode(b);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Helper: SHA-256 hash using Web Crypto
  function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return crypto.subtle.digest('SHA-256', data);
  }

  it('generates valid code verifier and code challenge pair', () => {
    cy.login("PKCE");

    cy.get('[data-cy="generate-pkce"]').click();

    // Grab verifier and challenge
    cy.get('[data-cy="pkce-code-verifier"] textarea, [data-cy="pkce-code-verifier"] input')
      .invoke('val')
      .then(async (verifier) => {
        cy.get('[data-cy="pkce-code-challenge"] textarea, [data-cy="pkce-code-challenge"] input')
          .invoke('val')
          .then(async (challenge) => {
            // Run the verification inside Cypress test (async)
            const hashedBuffer = await sha256(verifier);
            const expectedChallenge = base64UrlEncode(hashedBuffer);

            expect(challenge).to.eq(expectedChallenge);
          });
      });
  });
});