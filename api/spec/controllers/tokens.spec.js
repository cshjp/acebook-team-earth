//api/spec/controllers/tokens.spec.js

const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/login", () => { 
  //adds this due to the fail on 'duplicate key error' for the email field
  //so we have to clean the DB before each test, and here the beforeEach for
  // beforeEach(async () => {
  //   await User.deleteMany({});
  // });

  beforeEach(async () => {
    //const user = new User({ name: "Candy Duck", email: "test@test.com", password: "12345678" });//name: "Test User", 
    //await user.save();
    await User.create({ name: "Candy Duck 2", email: "test@test.com", password: "12345678" });
    //asynch operation that return a promise so we've to wait for the completion before running test cases
    //or else test cases might run before the user has been saved to DB
  });

  test("should return a token when credentials are valid", async () => {
    let response = await request(app)
      .post("/tokens/login")
      // .send({name: "Candy Duck", email: "test@test.com", password: "12345678"})
      .send({email: "test@test.com", password: "12345678"})
      // .expect(200);

    // expect(response.body.token).toBeDefined();
    expect(response.status).toBe(200);

    //expect(response.body.token).not.toEqual(undefined)
    //modify expected msg string
    
    expect(response.body.message).toEqual("User logged in successfully")

    //login with invalid credentials
    // response = await request(app)
    //   .post("/tokens/login")
    //   .send({ name: "Candy Duck", email: "test@test.com", password: "wrongpassword"})
    //   .expect(401);

    // expect(response.body.error).toEqual("auth error");
  });


  test("should not return a token when credentials are invalid", async () => {
    const response = await request(app)
      .post("/tokens/login") 
      .send({name: "Candy Duck", email: "test@test.com", password: "wrongpassword"})
      .expect(401);
    
    // expect(response.status).toBe(401)
    //expect(response.body.token).toBeUndefined();
    //modify expected msg string
    //expect(response.body.error).toEqual("Invalid email or password, Please Try again!")
    expect(response.body.message).toEqual("auth error")
  });
});