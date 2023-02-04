const genre = require("../routes/genre");
const customer = require("../routes/customer");
const movies = require("../routes/movie");
const rentals = require("../routes/rental");
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/genres", genre);
  app.use("/api/customers", customer);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
