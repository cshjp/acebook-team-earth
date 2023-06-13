describe('Updating a post', () => {
  
  // beforeEach(() => {
  //   cy.signup("duck@pond.com", "Il0veBread")
  //   cy.login("duck@pond.com", "Il0veBread")
  // });
  it('signs up and creates a post', () => {
    cy.signup("duck@pond.com", "Il0veBread")
  })

  it('should make a post when user is logged in and then update that post', () => {
    cy.login("duck@pond.com", "Il0veBread");
    cy.url().should("include", "/posts");
    cy.visit('/create-post');
    cy.url().should("include", "/create-post");
    cy.get('#message').type('ducklings');
    cy.get('#submit').click();
    cy.url().should("include", "/posts");
    cy.get('').click();
  })