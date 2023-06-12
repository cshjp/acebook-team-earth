// api/models/token_generator.js
require('dotenv').config(); //loading environment variables
//require('dotenv').config({ path: 'api/.env' });// both works but needs to swap sometimes!

const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class TokenGenerator {
  static jsonwebtoken(user_id) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");// for debug log
    }
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