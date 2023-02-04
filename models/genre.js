const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 64,
  },
});
const Genre = mongoose.model("Genres", genreSchema);

function genreIsValid(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  const { error } = genreSchema.validate(genre);
  if (error) return error.details[0].message;

  return true;
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.genreIsValid = genreIsValid;
