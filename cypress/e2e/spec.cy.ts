describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#\\:Rlmcq\\:-form-item').clear();
    cy.get('#\\:Rlmcq\\:-form-item').type('fast');
    cy.get('.inline-flex').click();
    cy.get('.pt-0 > :nth-child(1) > :nth-child(1) > .border').click();
    cy.get(':nth-child(1) > .pt-0 > :nth-child(1) > :nth-child(3) > .border > .h-4').click();
    /* ==== End Cypress Studio ==== */
  });
});
