const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
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
  })
);

function customerIsValid(customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
    phone: Joi.string().min(9).max(16).required(),
    isGold: Joi.boolean(),
  });

  const { error } = customerSchema.validate(customer);
  if (error) return error.details[0].message;

  return true;
}

module.exports.Customer = Customer;
module.exports.customerIsValid = customerIsValid;
