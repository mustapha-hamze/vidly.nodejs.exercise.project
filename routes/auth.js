const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const validationResult = validation(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult); // 400 code means bad request

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

function validation(user) {
  const userSchema = Joi.object({
    email: Joi.string().min(8).max(128).required(),
    password: Joi.string().min(8).max(64).required(),
  });

  const { error } = userSchema.validate(user);
  if (error) return error.details[0].message;

  return true;
}

module.exports = router;
