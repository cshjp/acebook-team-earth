//api/routes/tokens.js
//this file defines the routes related to token operation 
//(e.g. login and token generation)


const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/tokens");

//route for login and token generation
router.post("/", TokenController.login);

module.exports = router;

//Brief explanation: 
// the user will sign up through the '/signup'endpoint 
//which is handled by 'signupUser method in UserController

// and users will log in through the '/login' endpoint which handled by the 'Created' method in TokenController
//therefore, we don't need to add code for generating and sending an authentication token in 'routes/user.js
//that part is now handled in Here>'routes/tokens.js through TokenController