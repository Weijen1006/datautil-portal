describe("Regex Tool", () => {
  beforeEach(() => {
    cy.login("Regex");
  });

  it("displays error for invalid regex pattern", () => {
    // Test invalid regex pattern
    cy.get('[data-cy="regex-input"]').clear().type("***[InvalidRegex]***"); // Invalid regex pattern

    cy.get('[data-cy="regex-test-input"]')
      .clear()
      .type("This is a test string");

    // Click the "Test Regex" button
    cy.get('[data-cy="test-regex"]').click();

    // Check for error message
    cy.get('[data-cy="regex-error"]').should(
      "contain.text",
      "Invalid regular expression"
    );
  });

  it("tests a valid regex pattern and displays matches", () => {
    const regexPattern = "\\d{3}"; // Matches 3 digits in a row
    const testString = "Here are some numbers: 123, 456, and 789";

    // Input valid regex and test string
    cy.get('[data-cy="regex-input"]').clear().type(regexPattern, {
      parseSpecialCharSequences: false,
    });

    cy.get('[data-cy="regex-test-input"]').clear().type(testString, {
      parseSpecialCharSequences: false,
    });

    // Click the "Test Regex" button
    cy.get('[data-cy="test-regex"]').click();

    // Verify matches are displayed
    cy.contains("Matches:").should("exist");
    cy.get('[data-cy="regex-matches-output"] textarea').should(
      "have.value",
      "123\n456\n789"
    );
  });

  it('displays "No matches found" message when no matches are found', () => {
    const regexPattern = "\\d{5}"; // This pattern won't match the test string
    const testString = "This string has no 5-digit numbers.";

    // Input regex pattern and test string
    cy.get('[data-cy="regex-input"]').clear().type(regexPattern, {
      parseSpecialCharSequences: false,
    });

    cy.get('[data-cy="regex-test-input"]').clear().type(testString, {
      parseSpecialCharSequences: false,
    });

    // Click the "Test Regex" button
    cy.get('[data-cy="test-regex"]').click();

    // Verify the "No matches found" message is displayed
    cy.get('[data-cy="regex-no-match"]').should(
      "contain.text",
      "No matches found"
    );
  });
});
