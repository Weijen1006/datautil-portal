describe("Base64 Encoder Decoder", () => {
  const sampleText = "mysupersecret";
  const encodedText = "bXlzdXBlcnNlY3JldA==";

  beforeEach(() => {
    cy.login("Base64");
  });

  it("Encode base64 correctly", () => {
    cy.get('[data-cy="base64-input"]')
      .clear()
      .type(sampleText, { parseSpecialCharSequences: false });
    cy.get('[data-cy="base64-encode"]').click();
    cy.get('[data-cy="base64-encoded-output"] textarea').should(
      "have.value",
      encodedText
    );
  });

  it("Decode base64 correctly", () => {
    cy.get('[data-cy="base64-input"]')
      .clear()
      .type(encodedText, { parseSpecialCharSequences: false });
    cy.get('[data-cy="base64-decode"]').click();
    cy.get('[data-cy="base64-decoded-output"] textarea').should(
      "have.value",
      sampleText
    );
  });

  it("Shows error on decoding base64", () => {
    cy.get('[data-cy="base64-input"]').type("{ invalid base64 }", {
      parseSpecialCharSequences: false,
    });
    cy.get('[data-cy="base64-decode"]').click();
    cy.get('[data-cy="base64-error"]').should(
      "have.text",
      "Error decoding data"
    );
  });
});
