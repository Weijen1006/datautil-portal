describe("HtmlViewer", () => {
  beforeEach(() => {
    cy.login("HTML");
  });

  it("renders valid HTML into the iframe", () => {
    const htmlContent = "<h1>Hello, Cypress!</h1><p>This is a test.</p>";

    cy.get('[data-cy="html-input"]')
      .clear()
      .type(htmlContent, { parseSpecialCharSequences: false });

    cy.contains("Render HTML").click();

    cy.get('[data-cy="html-output"]').should("exist");

    cy.get('[data-cy="html-output"]').then(($iframe) => {
      const iframe = $iframe[0] as HTMLIFrameElement;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      cy.wrap(doc?.body).should("contain.text", "Hello, Cypress!");
      cy.wrap(doc?.body).find("h1").should("have.text", "Hello, Cypress!");
      cy.wrap(doc?.body).find("p").should("have.text", "This is a test.");
    });
  });

  it("handles malformed HTML without showing error", () => {
    const malformedHtml = "<div><p>Unclosed tag";

    cy.get('[data-cy="html-input"]')
      .clear()
      .type(malformedHtml, { parseSpecialCharSequences: false });

    cy.contains("Render HTML").click();

    cy.get('[data-cy="html-output"]').should("exist");

    cy.get('[data-cy="html-output"]').then(($iframe) => {
      const iframe = $iframe[0] as HTMLIFrameElement;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      cy.wrap(doc?.body).should("contain.text", "Unclosed tag");
    });

    cy.get('[data-cy="html-error"]').should("not.exist");
  });
});
