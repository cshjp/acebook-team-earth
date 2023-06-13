import UpdatePost from './UpdatePost'
const navigate = () => {}

describe("Update post", () => {
  it("calls the /posts/:post_id/update endpoint", () => {
    cy.mount(<UpdatePost navigate={navigate} />)

    cy.get("form").should("be.visible")
    
    cy.get("#message").type("quack quack")
    cy.get("#submit").click()
  })
})
