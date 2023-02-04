const express = require("express");
const router = express.Router();
const { Genre, genreIsValid } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res, next) => {
  // throw new Error("Could not get genres.");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found"); ///404 code means not found

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const validationResult = genreIsValid(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult); // 400 code means bad request

  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const validationResult = genreIsValid(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult); // 400 code means bad request

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given Id was not found");

  return res.send(genre);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given Id was not found");

  return res.send(genre);
});

module.exports = router;
