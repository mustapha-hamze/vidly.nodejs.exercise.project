const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const { Genre } = require("../models/genre");
const router = express.Router();
const { Movie, movieIsValid } = require("../models/movie");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found"); ///404 code means not found

  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const validationResult = movieIsValid(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult); // 400 code means bad request

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const validationResult = movieIsValid(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult); // 400 code means bad request

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.name,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.isGold,
        dailyRentalRate: req.body.isGold,
      },
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given Id was not found");

  return res.send(movie);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given Id was not found");

  return res.send(movie);
});

module.exports = router;
