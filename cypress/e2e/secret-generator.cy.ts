describe("Secret Generator", () => {
  beforeEach(() => {
    cy.login("SecretGen");
  });

  it("should generate a secret when with only some options selected", () => {
    // Check that initial state is correct
    cy.get('[data-cy="secret-length-input"] input').should("have.value", "16");
    cy.get('[data-cy="include-lowercase"] input').should("be.checked");
    cy.get('[data-cy="include-uppercase"] input').should("be.checked");
    cy.get('[data-cy="include-number"] input').should("be.checked");
    cy.get('[data-cy="include-special-character"] input').should("be.checked");

    // Set a custom length
    cy.get('[data-cy="secret-length-input"] input').clear().type("12"); // Change secret length to 12

    // Uncheck some options
    cy.get('[data-cy="include-lowercase"] input').uncheck();
    cy.get('[data-cy="include-special-character"] input').uncheck();

    // Click the generate secret button
    cy.get('[data-cy="generate-secret"]').click();

    // Check if generated secret appears
    cy.get('[data-cy="secret-output"] textarea')
      .invoke("val")
      .should("have.length", 12) // The generated secret should have length 12
      .then((secret) => {
        expect(secret).to.match(/^[A-Z0-9]{12}$/); // Only uppercase letters and numbers should be present
      });
  });

  it("should show an error message when secret length is less than 1", () => {
    // Set the secret length to an invalid value (less than 1)
    cy.get('[data-cy="secret-length-input"] input').clear().type("0");

    // Click the generate secret button
    cy.get('[data-cy="generate-secret"]').click();

    // Check for error message
    cy.get('[data-cy="secret-error"]').should(
      "contain",
      "Secret length must be greater than 0"
    );
  });

  it("should show an error message if no character sets are selected", () => {
    // Uncheck all options
    cy.get('[data-cy="include-lowercase"] input').uncheck();
    cy.get('[data-cy="include-uppercase"] input').uncheck();
    cy.get('[data-cy="include-number"] input').uncheck();
    cy.get('[data-cy="include-special-character"] input').uncheck();

    // Try generating the secret
    cy.get('[data-cy="generate-secret"]').click();

    // Ensure error is shown
    cy.get('[data-cy="secret-error"]').should(
      "contain",
      "You must select at least one character set"
    );
  });

  it("should generate a secret with the default settings", () => {
    // By default, the secret length should be 16, and all character sets should be checked
    cy.get('[data-cy="secret-length-input"] input').should("have.value", "16");

    // Click the generate secret button
    cy.get('[data-cy="generate-secret"]').click();

    // Ensure that the generated secret appears with the correct length
    cy.get('[data-cy="secret-output"] textarea')
      .invoke("val")
      .should("have.length", 16)
      .then((secret) => {
        expect(secret).to.match(/[a-z]/); // At least one lowercase letter
        expect(secret).to.match(/[A-Z]/); // At least one uppercase letter
        expect(secret).to.match(/\d/); // At least one number
        expect(secret).to.match(/[!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?]/); // At least one special character
      });
  });
});
