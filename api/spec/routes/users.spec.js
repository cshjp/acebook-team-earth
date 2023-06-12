// // api/spec/routes/users.spec.js
// const request = require("supertest"); // Import supertest for making HTTP requests
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");

// const app = require("../../app");
// const User = require("../../models/user"); // Import User model
// require('../mongodb_helper');

// describe("Users Routes", () => {
//   // beforeAll(async () => {
//     // await mongoose.connect(process.env.MONGODB_URI, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//   // });

//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//   });

//   it("should register a new user with a hashed password", async () => {
//     const user = {
//       name: "Candy Duck",
//       email: "cd@example.com",
//       password: "password123",
//     };

//     const response = await request(app)
//       .post("/users/signup") //correct
//       .send(user)
//       .expect(201); // Expect a successful registration response

//     expect(response.body.message).toBe("User signed up successfully");

//     const savedUser = await User.findOne({ email: user.email });
//     expect(savedUser).toBeTruthy();
//     expect(savedUser.password).not.toBe(user.password);
//     const isPasswordValid = await bcrypt.compare(
//       user.password,
//       savedUser.password
//     );
//     expect(isPasswordValid).toBe(true);
//   });
// });
