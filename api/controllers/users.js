// api/controllers/user.js  (should be controllers/authController.js for clarification!!!)
// this file incl the logic to create a new user in the database. 
//the hashing operation isn't repeated  here because it's already done in 'api/models/user.js'
//the controller is not utilized yet but kept for potential future use and for adhering to mvc pattern

// api/controllers/users.js

const User = require("../models/User");

class UsersController {
  static async signupUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      const user = new User({ name, email, password });
      await user.save()
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !await user.isValidPassword(password)) {
        return res.status(401).json({ error: 'Invalid email or password, Please Try again!'});
      }
      // Generate and send authentication token
      // ...
      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UsersController;
