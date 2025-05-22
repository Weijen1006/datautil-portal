describe("Timestamp Converter", () => {
  beforeEach(() => {
    cy.login("TimeStamp");
  });

  it("should convert a valid Unix timestamp to a readable date", () => {
    // Example: 1700000000 → Sun, 15 Oct 2023 10:13:20 GMT
    const inputTimestamp = "1700000000";

    cy.get('[data-cy="timestamp-input"]').clear().type(inputTimestamp);

    cy.contains("button", "Convert Timestamp").click();

    cy.get('[data-cy="timestamp-output"] textarea')
      .should("not.have.value", "")
      .invoke("val")
      .should("include", "GMT");
  });

  it("should show an error message for invalid timestamp input", () => {
    cy.get('[data-cy="timestamp-input"]').clear().type("invalid_timestamp");

    cy.contains("button", "Convert Timestamp").click();

    cy.get('[data-cy="timestamp-error"]')
      .should("be.visible")
      .and("contain", "Invalid timestamp format");

    cy.get('[data-cy="timestamp-output"]').should("not.exist");
  });

  it("should clear output and show error for empty input", () => {
    cy.get('[data-cy="timestamp-input"]').clear();

    cy.contains("button", "Convert Timestamp").click();

    cy.get('[data-cy="timestamp-error"]')
      .should("be.visible")
      .and("contain", "Invalid timestamp format");

    cy.get('[data-cy="timestamp-output"]').should("not.exist");
  });
});
