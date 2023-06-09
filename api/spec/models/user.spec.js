const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      name: "Candy Duck", // Adding the name field here
      email: "someone@example.com",
      password: "password",
    }, 10000); //set timeout to 10 sec
 
    user.save((err) => {
      expect(err).toBeNull();
  
      User.find((err, users) => {
        expect(err).toBeNull();
  
        expect(users[0]).toMatchObject({
          name: "Candy Duck", // Expect the name to be as provided
          email: "someone@example.com",
        });

        //check a hashed pw exists
        expect(users[0].password).toBeDefined();
        expect(users[0].password).not.toEqual("password")// shouldn't = plaintext pw
      
        done();
      });
    });
  });
});
