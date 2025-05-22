describe("JWT Decoder", () => {
  const jwtSample =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcxNjM2MDAwMH0.dummysignature1234567890";
  const jwtHeader = `{
  "alg": "HS256",
  "typ": "JWT"
}`;
  const jwtPayload = `{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1716360000
}`;

  beforeEach(() => {
    cy.login("JWT");
  });

  it("Decode JWT correctly", () => {
    cy.get('[data-cy="jwt-input"]')
      .clear()
      .type(jwtSample, { parseSpecialCharSequences: false });
    cy.get('[data-cy="jwt-decode"]').click();
    cy.get('[data-cy="jwt-header-output"] textarea').should(
      "have.value",
      jwtHeader
    );
    cy.get('[data-cy="jwt-payload-output"] textarea').should(
      "have.value",
      jwtPayload
    );
  });

  it("Shows error on invalid jwt", () => {
    cy.get('[data-cy="jwt-input"]').type("Invalid JWT", {
      parseSpecialCharSequences: false,
    });
    cy.get('[data-cy="jwt-decode"]').click();
    cy.get('[data-cy="jwt-error"]').should("have.text", "Invalid JWT format or unable to decode");
  });
});
