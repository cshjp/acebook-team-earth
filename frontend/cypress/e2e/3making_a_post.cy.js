describe('Making a post', () => {
  
  beforeEach(() => {
    // cy.sigx  nup("user@email.com", "12345678")
    // cy.login("user@email.com", "12345678")
  });
  
  it('should make a post when user is logged in', () => {
    cy.login("user@email.com", "12345678")
    cy.visit('/create-post');
    cy.get('#message').type('ducklings');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('ducklings');
  })

  it('should post two posts and they should both be in the feed', () => {
    cy.visit('/create-post');
    cy.get('#message').type('duck');
    cy.get('#submit').click();
    cy.visit('/create-post');
    cy.get('#message').type('goose');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.contains('duck');
    cy.contains('goose');
  })
});