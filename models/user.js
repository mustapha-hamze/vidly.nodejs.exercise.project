const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
    max: 32,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 16,
  },
  email: {
    type: String,
    min: 5,
    max: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 5,
    max: 1024,
    required: true,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { email: this.email, _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("Users", userSchema);

function userIsValid(user) {
  const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(32).required(),
    lastName: Joi.string().min(3).max(32).required(),
    phone: Joi.string().min(9).max(16).required(),
    email: Joi.string().min(8).max(128).required(),
    password: Joi.string().min(8).max(64).required(),
  });

  const { error } = userSchema.validate(user);
  if (error) return error.details[0].message;

  return true;
}

module.exports.User = User;
module.exports.userIsValid = userIsValid;
