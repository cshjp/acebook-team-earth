// api/models/token_generator.js
require('dotenv').config(); //loading envir variables
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// if (!secret) {
//   console.error("Missing JWT_SECRET environment variable. Shutting down..");
//   process.exit(1);
// } for debug log

class TokenGenerator {
  static jsonwebtoken(user_id) {
    const secret = process.env.JWT_SECRET;
    return JWT.sign(
      {
      user_id: user_id,
      iat: Math.floor(Date.now() / 1000),  
      // Set the JWT token to expire in 10 minutes
      // exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret, { expiresIn: '10m'});
  }
}

module.exports = TokenGenerator;