const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rentals",
  new mongoose.Schema({
    customer: {
      // because we need just primary property
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 32,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 32,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 3,
          maxlength: 32,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function rentalIsValid(rental) {
  const rentalSchema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  const { error } = rentalSchema.validate(rental);
  if (error) return error.details[0].message;

  return true;
}

module.exports.Rental = Rental;
module.exports.rentalIsValid = rentalIsValid;
