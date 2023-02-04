const express = require("express");
const { Rental, rentalIsValid } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const router = express.Router();
// const Fawn = require("fawn");
// const mongoose = require("mongoose");

// Fawn.init("mongodb://localhost:27017/vidly");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const validationResult = rentalIsValid(req.body);
  if (validationResult !== true) return res.status(400).send(validationResult);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // Fawn is like transaction in relational databases for mongodb
  // below commands run and execute one by one if one of them went wrong all commands won't run and database will restore to init state
  //   try {
  //     new Fawn.Task()
  //       .save("rentals", rental)
  //       .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
  //       .run();
  //     res.send(rental);
  //   } catch (error) {
  //     res.status(500).send("Something went wrong.");
  //   }
  await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

module.exports = router;
