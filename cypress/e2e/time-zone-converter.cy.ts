describe("TimeZoneConverter component", () => {
  beforeEach(() => {
    cy.login("TimeZone");
  });

  it("has default timezones selected", () => {
    cy.get("[data-cy=timezone-source]").within(() => {
      cy.get("input").invoke("val").should("not.be.empty");
    });
    cy.get("[data-cy=timezone-target]").within(() => {
      cy.get("input").should("have.value", "America/New_York (GMT-05:00)");
    });
  });

  it("allows selecting a source timezone via search/autocomplete", () => {
    cy.get("[data-cy=timezone-source]").click();
    cy.get("[role=listbox]").should("be.visible");
    cy.get('[data-cy=timezone-source] input[type="text"]').type("Tokyo");
    cy.get("[role=listbox] li").contains("Tokyo").click();
    cy.get("[data-cy=timezone-source] input").should(
      "have.value",
      "Asia/Tokyo (GMT+09:00)"
    );
  });

  it("allows selecting a target timezone via search/autocomplete", () => {
    cy.get("[data-cy=timezone-target]").click();
    cy.get("[role=listbox]").should("be.visible");
    cy.get('[data-cy=timezone-target] input[type="text"]').type("London");
    cy.get("[role=listbox] li").contains("London").click();
    cy.get("[data-cy=timezone-target] input").should(
      "have.value",
      "Europe/London (GMT+00:00)"
    );
  });
});
