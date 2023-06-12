//api/spec/controllers/tokens.spec.js

const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/login", () => { 
  beforeAll(async () => {
    //const user = new User({ name: "Candy Duck", email: "test@test.com", password: "12345678" });//name: "Test User", 
    //await user.save();
    await User.create({ email: "test@test.com", password: "12345678" });
    //asynch operation that return a promise so we've to wait for the completion before running test cases
    //or else test cases might run before the user has been saved to DB
  });

  test("should return a token when credentials are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "12345678" })

    expect(response.body.token).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("User logged in successfully")
  });


  test("should not return a token when credentials are invalid", async () => {
    const response = await request(app)
      .post("/tokens") 
      .send({ email: "test@test.com", password: "wrongpassword" })
    
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual("auth error")
  });
});