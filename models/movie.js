const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      tirm: true,
      minlength: 3,
      maxlength: 32,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function movieIsValid(movie) {
  const movieSchema = Joi.object({
    title: Joi.string().min(3).max(32).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  const { error } = movieSchema.validate(movie);
  if (error) return error.details[0].message;

  return true;
}

module.exports.Movie = Movie;
module.exports.movieIsValid = movieIsValid;
