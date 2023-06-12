// api/controllers/user.js  (should be controllers/authController.js for clarification!!!)
// this file incl the logic to create a new user in the database. 
//the hashing operation isn't repeated  here because it's already done in 'api/models/user.js'
//the controller is not utilized yet but kept for potential future use and for adhering to mvc pattern

// api/controllers/users.js
//===========================
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// class UsersController {
//   //signupUser is an asynchronous method that handles user signup/registration
//   static async signup(req, res) {
//     try {
//       const hashedPassword = await bcrypt.has(req.body.password, 10);//hash pw
//        //if a user doesn't exists, create a new one and save it in DB
//       const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword, //saved hashed pw
//       });

//       await user.save();
//       res.status(201).send({ message: "User signed up successfully!" });
//     } catch (error) {
//       if (error.code === 11000) {
//         res.status(409).json({ error: 'Email already exists' });
//       } else {
//         res.status(500).json({ error: 'Internal server error' });
//       }  
//     }
//   }
// }
//========================

const User = require("../models/User");

class UsersController {
  static async signupUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Email already exists');
        return res.status(409).json({ error: 'Email already exists' });
      }
      const user = new User({ name, email, password });
      await user.save()
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
},


  //This gets the user's username based on their userId
  // Find the user by their userId and retrieve only the 'username' field
  // If an error is found sends a (plain text) response with a status of 400 (Bad Request)
  // If a user is found, sends a response with a status of 200 (OK) and the retrieved username
  // If a user is not found, sends a response with a status of 404 (Not Found)
  GetUsername: (req, res) => {
    const { user_Id } = req.params;

    User.findById(user_Id, 'username', (err, user) => {
      if (err) {
        
        res.status(400).send({ message: 'Bad request' });
      } else {
        if (user) {
          res.status(200).send({ username: user.username });  //can use .send instead of returning the json object
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  }
};

module.exports = UsersController;

