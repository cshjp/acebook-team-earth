// api/spec/controllers/users.spec.js
const app = require("../../app");
const request = require("supertest");
const bcrypt = require("bcrypt");
require("../mongodb_helper");
const User = require("../../models/user");
//const UsersController = require("../../controllers/Users");

describe('UsersController', () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST /users/signup", () => {
    it('should save a user with a hashed password', async () => {
      const response = await request(app)
        .post("/users/signup")
        .send({name: "Test User", email: "test@example.com", password: "plaintextpassword"});

      expect(response.status).toBe(201);
      const user = await User.findOne({email: "test@example.com"});
      console.log('Stored hashed password:', user.password);//for testing log the stored pw
      const validPassword = await user.isValidPassword("plaintextpassword");
      console.log('Bcrypt comparison result: ', validPassword); // testing log
      expect(validPassword).toBe(true);
    });

    it('should not signup user if email already exists', async () => {
      await request(app)
        .post("/users/signup")
        .send({name: "Test User", email: "test@example.com", password: "password"});

      const response = await request(app)
        .post("/users/signup")
        .send({name: "Test User", email: "test@example.com", password: "password"});

      expect(response.status).toBe(409);
    });
  });
});
//   describe("POST /users/login", () => {
//     it('should login user with correct credentials', async () => {
//       await request(app)
//         .post("/users/signup")
//         .send({name: "Test User", email: "test@example.com", password: "plaintextpassword"});

//       const response = await request(app)
//         .post("/users/login")
//         .send({email: "test@example.com", password: "plaintextpassword"});

//       expect(response.status).toBe(200);
//     });

//     it('should not login user with incorrect credentials', async () => {
//       const response = await request(app)
//         .post("/users/login")
//         .send({email: "test@example.com", password: "wrongpassword"});

//       expect(response.status).toBe(401);
//     });
//   });
// });
