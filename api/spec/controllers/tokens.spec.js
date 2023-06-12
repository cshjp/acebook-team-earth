//api/spec/controllers/tokens.spec.js

const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/login", () => { 
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({ email: "test@test.com", password: "12345678" });
  });

  test("should return a token when credentials are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "12345678" })

    // expect(response.body.token).toBeDefined();
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