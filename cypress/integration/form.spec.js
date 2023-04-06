import { Yup } from 'yup';

describe('Formik Form', () => {
  it('submits valid data', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="accountId"]').type('valid-uuid');
    cy.get('input[name="amount"]').type('100');
    cy.get('input[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('displays error message for invalid data', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="accountId"]').type('invalid');
    cy.get('input[name="amount"]').type('invalid');
    cy.get('input[type="submit"]').click();
    cy.contains('Amount is required');
  });
});
