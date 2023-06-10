//api/controllers/token.js 

// const User = require("../models/User");
// const TokenGenerator = require("../models/token_generator")

// const SessionsController = {

//   Create: (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     User.findOne({ email: email }).then(async (user) => {
//       if (!user) {
//         console.log("auth error: user not found")
//         res.status(401).json({ message: "auth error" });
//       } else if (user.password !== password) {
//         console.log("auth error: passwords do not match")
//         res.status(401).json({ message: "auth error" });
//       } else {
//         const token = await TokenGenerator.jsonwebtoken(user.id)
//         res.status(201).json({ token: token, message: "OK" });
//       }
//     });
//   }
// };

// module.exports = SessionsController;
//============

//api/controllers/token.js 
const User = require("../models/User");
const TokenGenerator = require("../models/token_generator");

const TokenController = {
  
  //login is an asynchronous method that handles the login process
  //or method for login and token generation
  login: async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
      //finding the user with the given email in DB
      // const email = req.body.email;
      // const password = req.body.password;

      const user = await User.findOne(email);

      if (!user || !await user.isValidPassword(password)) {
        console.log("auth error; Invalid email or password, Please Try again!");
        return res.status(401).json({ message: 'auth error'});
      } 
      // Generate and send authentication token
      //if user exists and pw is valid, then generate a token for the user
      const token = await TokenGenerator.jsonwebtoken(user.id);
      // and responding with the token and a success msg
      return res.status(200).json({ token: token, message: 'User logged in successfully' });
      //return res.status(201).json({ token: token, message: 'OK' });
  } catch (error) {
      console.log('auth error', error); // add debug log
      //if there was an unexpected err, handle it and respond with a err msg
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = TokenController;
