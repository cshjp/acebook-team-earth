// api/models/user.js
//this file sets up a UserSchema for mongoDB
//it has the pw hashing logic set up before saving to the DB
//it includes a method for pw validation


const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false}, //// Defines the 'username' field as a string. username is not a string, Mongoose will throw error
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  // console.log('Entered password: ', password); //debug log
  // const user = this;
  // const compare = await bcrypt.compare(password, user.password);
  // console.log('Comparison result: ', compare); //debug log
  // return compare;
  try {  
    // console.log('Hashed password: ',this.password); //debug log
    // const compare = await bcrypt.compare(password, this.password);  
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;

