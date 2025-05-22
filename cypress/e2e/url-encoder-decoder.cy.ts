describe('URL Encoder Decoder', () => {
    const sampleUrl = 'https://example.com';
    const encodedUrl = 'https%3A%2F%2Fexample.com';

  beforeEach(() => {
    cy.login('URL');
  });

  it('Encode url correctly', () => {
    cy.get('[data-cy="url-input"]').clear().type(sampleUrl,{ parseSpecialCharSequences: false });
    cy.get('[data-cy="url-encode"]').click();
    cy.get('[data-cy="url-encoded-output"] textarea').should('have.value', encodedUrl);
  });

  it('Decode url correctly', () => {
    cy.get('[data-cy="url-input"]').clear().type(encodedUrl,{ parseSpecialCharSequences: false });
    cy.get('[data-cy="url-decode"]').click();
    cy.get('[data-cy="url-decoded-output"] textarea').should('have.value', sampleUrl);
  });

  it('Shows error on decoding url', () => {
    cy.get('[data-cy="url-input"]').type('%ZZ', { parseSpecialCharSequences: false });
    cy.get('[data-cy="url-decode"]').click();
    cy.get('[data-cy="url-error"]').should('have.text', 'Error decoding data');
  });

});