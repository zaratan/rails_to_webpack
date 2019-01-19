describe('Logging in', () => {
  describe('Visiting the root', () => {
    it('redirects to the login page', () => {
      cy.visit('/');
      cy.url().should('include', '/auth/sign_in');
    });
  });

  it('logs you in', () => {
    cy.visit('/');
    cy.get('input[name="user[login]"]').type('zaratan');
    cy.get('input[name="user[password]"]').type('pommes');
    cy.get('input[name="commit"]').click();

    cy.get('.notice').should('contain', 'Signed in successfully.');

    cy.get('input[value="SIGN OUT"]').click();
  });
});
