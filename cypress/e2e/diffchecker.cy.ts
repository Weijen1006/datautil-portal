describe("DiffChecker Component", () => {
  beforeEach(() => {
    cy.login("DiffChecker");
  });

  it("should display character-level differences correctly", () => {
    cy.get('[data-cy="text1-input"]').type("Hello World");
    cy.get('[data-cy="text2-input"]').type("Hello Brave New World");

    cy.get('[data-cy="compare-character"]').click();

    cy.get('[data-cy="diff-result"]').should("exist");
    cy.get('[data-cy="added-count"]').should("contain", "addition");
    cy.get('[data-cy="removed-count"]').should("contain", "removal");

    cy.get('[data-cy="diff-result"] span')
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("should display line-level differences correctly", () => {
    const text1 = `Line one\nLine two\nLine three`;
    const text2 = `Line one\nLine 2 changed\nLine three\nLine four`;

    cy.get('[data-cy="text1-input"]').type(text1);
    cy.get('[data-cy="text2-input"]').type(text2);

    cy.get('[data-cy="compare-line"]').click();

    cy.get('[data-cy="diff-result"]').should("exist");
    cy.get('[data-cy="added-count"]').should("contain", "addition");
    cy.get('[data-cy="removed-count"]').should("contain", "removal");

    cy.get('[data-cy="diff-result"] span')
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("should handle empty input gracefully", () => {
    cy.get('[data-cy="compare-character"]').click();
    cy.get('[data-cy="diff-result"]').should("not.exist");

    cy.get('[data-cy="compare-line"]').click();
    cy.get('[data-cy="diff-result"]').should("not.exist");
  });
});
