describe("Home Page", () => {
  beforeEach(() => {
    cy.login("Home");
  });

  it("displays the correct title", () => {
    cy.get('[data-cy="home-title"]').should("contain.text", "Welcome to");
  });

  it("displays the correct subtitle", () => {
    cy.get('[data-cy="home-subtitle"]').should(
      "contain.text",
      "Your go-to suite for powerful data utilities—JSON, Base64, JWT and more."
    );
  });

  it("displays the correct description", () => {
    cy.get('[data-cy="home-description"]').should(
      "contain.text",
      "Simplify your workflow with easy-to-use tools, built for developers, data analysts, and tech enthusiasts."
    );
  });
});
