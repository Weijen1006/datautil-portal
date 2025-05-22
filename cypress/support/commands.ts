/// <reference types="cypress" />
export {};

Cypress.Commands.add('login', (label: string) => {
    cy.visit('http://localhost:5173/datautil-portal/');
    // cy.visit('https://weijen1006.github.io/datautil-portal/');
    cy.get(`[data-cy=${label}]`).click();
 })

declare global {
  namespace Cypress {
    interface Chainable {
      login(label: string): Chainable<void>
    }
  }
}