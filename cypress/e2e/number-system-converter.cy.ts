describe('Number System Converter', () => {
  const testCases = [
    { input: '10', inputBase: 'decimal', outputBase: 'decimal', expected: '10' },
    { input: '10', inputBase: 'decimal', outputBase: 'hexadecimal', expected: 'A' },
    { input: '10', inputBase: 'decimal', outputBase: 'binary', expected: '1010' },
    { input: '10', inputBase: 'decimal', outputBase: 'octal', expected: '12' },

    { input: 'A', inputBase: 'hexadecimal', outputBase: 'decimal', expected: '10' },
    { input: 'A', inputBase: 'hexadecimal', outputBase: 'hexadecimal', expected: 'A' },
    { input: 'A', inputBase: 'hexadecimal', outputBase: 'binary', expected: '1010' },
    { input: 'A', inputBase: 'hexadecimal', outputBase: 'octal', expected: '12' },

    { input: '1010', inputBase: 'binary', outputBase: 'decimal', expected: '10' },
    { input: '1010', inputBase: 'binary', outputBase: 'hexadecimal', expected: 'A' },
    { input: '1010', inputBase: 'binary', outputBase: 'binary', expected: '1010' },
    { input: '1010', inputBase: 'binary', outputBase: 'octal', expected: '12' },

    { input: '12', inputBase: 'octal', outputBase: 'decimal', expected: '10' },
    { input: '12', inputBase: 'octal', outputBase: 'hexadecimal', expected: 'A' },
    { input: '12', inputBase: 'octal', outputBase: 'binary', expected: '1010' },
    { input: '12', inputBase: 'octal', outputBase: 'octal', expected: '12' },
  ];

  beforeEach(() => {
    cy.login('Number');
  });

  testCases.forEach(({ input, inputBase, outputBase, expected }) => {
    it(`converts ${input} (${inputBase}) → ${expected} (${outputBase})`, () => {
      cy.get('[data-cy="number-input"]').clear().type(input);

      cy.get('[data-cy="convert-input-base"]').click();
      cy.get(`[data-cy="convert-input-${inputBase}"]`).click();

      cy.get('[data-cy="convert-output-base"]').click();
      cy.get(`[data-cy="convert-output-${outputBase}"]`).click();

      cy.get('[data-cy="convert-number"]').click();

      cy.get('[data-cy="convert-number-output"] input')
        .should('have.value', expected);
    });
  });

  it('shows error for empty input', () => {
    cy.get('[data-cy="number-input"]').clear();
    cy.get('[data-cy="convert-number"]').click();
    cy.get('[data-cy="convert-number-error"]').should('contain', 'Please enter a value to convert.');
  });

  it('shows error for invalid hexadecimal input', () => {
    cy.get('[data-cy="number-input"]').clear().type('G1');
    cy.get('[data-cy="convert-input-base"]').click();
    cy.get('[data-cy="convert-input-hexadecimal"]').click();

    cy.get('[data-cy="convert-number"]').click();
    cy.get('[data-cy="convert-number-error"]').should('contain', 'Invalid number input for the given base');
  });

  it('converts binary input with leading zeros', () => {
    cy.get('[data-cy="number-input"]').clear().type('00001010');
    cy.get('[data-cy="convert-input-base"]').click();
    cy.get('[data-cy="convert-input-binary"]').click();
    cy.get('[data-cy="convert-output-base"]').click();
    cy.get('[data-cy="convert-output-decimal"]').click();
    cy.get('[data-cy="convert-number"]').click();
    cy.get('[data-cy="convert-number-output"] input').should('have.value', '10');
  });
});
