// api/spec/controllers/users.spec.js
const app = require("../../app");
const request = require("supertest");
const bcrypt = require("bcrypt");
require("../mongodb_helper");
const User = require("../../models/user");
//const UsersController = require("../../controllers/Users");

describe('UsersController', () => { //authController?
  beforeEach( async () => {
    await User.deleteMany({});
  });

  it('should register a user with a hashed password and not signup if email already exists', async () => {
    const user = {
      name: "Test User",
      email: "test@example.com",
      password: "plaintextpassword"
    };

    //due to the fail: that trying to create a user that doesn't exist yet, 
    //then expect 409 conflict response,hence we got 201
    //to solve it>first, create a user
    await request(app)
      .post("/users")
      .send(user)
      .expect(201);
    //then, re-try to signup with the same email
    const response = await request(app)
    .post("/users")
    .send(user)
    .expect(409);

  expect(response.body.error).toBe("Email already exists");
  //check the pw is still hashed
  const dbUser = await User.findOne({ email: user.email});
  const isValidPassword = await dbUser.isValidPassword(user.password);
  expect(isValidPassword).toBe(true);
  });
});
