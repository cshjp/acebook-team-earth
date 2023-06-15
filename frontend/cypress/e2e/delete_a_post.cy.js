beforeEach(() => {
  cy.signup("duck@pond.com", "Il0veBread")
  cy.login("duck@pond.com", "Il0veBread")
 });
 it('should make two posts and then delete the first one, () => {
  cy.visit('/create-post');
  cy.get('#message').type('duck');
  cy.get('#submit').click();
  cy.visit('/create-post');
  cy.get('#message').type('goose');
  cy.get('#submit').click();
  cy.contains('duck');
  cy.contains('goose');
  cy.visit(‘/delete-post’); // I think we still need to define this, and perhaps we need to edit the command.js file too?
  cy.contains('goose');
 })
});