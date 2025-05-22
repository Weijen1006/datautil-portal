describe('JSON Formatter', () => {
  const sampleJson = `{"name":"John","age":30,"city":"New York"}`;
  const prettyJson = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;
  const sortedJson = `{
  "age": 30,
  "city": "New York",
  "name": "John"
}`;

  beforeEach(() => {
    cy.login('JSON');
  });

  it('formats valid JSON correctly', () => {
    cy.get('[data-cy="json-input"]').clear().type(sampleJson, { parseSpecialCharSequences: false });
    cy.get('[data-cy="format-json"]').click();
    cy.get('[data-cy="json-output"] textarea').should('have.value', prettyJson);
  });

  it('serializes JSON into compact form', () => {
    cy.get('[data-cy="json-input"]').clear().type(prettyJson);
    cy.get('[data-cy="serialize-json"]').click();
    cy.get('[data-cy="json-output"] textarea').should('have.value', sampleJson);
  });

  it('escapes special characters', () => {
    cy.get('[data-cy="json-input"]').clear().type(prettyJson, { parseSpecialCharSequences: false });
    cy.get('[data-cy="escape-json"]').click();
    cy.get('[data-cy="json-output"] textarea')
      .should('contain.value', '\\"')
      .and('contain.value', '\\n');
  });

  it('unescapes special characters', () => {
    const escapedJson = sampleJson
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');

    cy.get('[data-cy="json-input"]').clear().type(escapedJson, { parseSpecialCharSequences: false });
    cy.get('[data-cy="unescape-json"]').click();
    cy.get('[data-cy="json-output"] textarea').should('have.value', sampleJson);
  });

  it('sorts JSON keys alphabetically', () => {
    cy.get('[data-cy="json-input"]').clear().type(sampleJson,{ parseSpecialCharSequences: false });
    cy.get('[data-cy="sort-json"]').click();
    cy.get('[data-cy="json-output"] textarea').should('have.value', sortedJson);
  });

  it('shows error on invalid JSON', () => {
    cy.get('[data-cy="json-input"]').type('{ invalid JSON }', { parseSpecialCharSequences: false });
    cy.get('[data-cy="format-json"]').click();
    cy.get('[data-cy="json-error"]').should('have.text', 'Invalid JSON');
  });
});
