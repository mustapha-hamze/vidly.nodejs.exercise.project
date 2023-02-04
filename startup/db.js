const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  //brew services start mongodb-community
  //brew services stop mongodb-community
  const db = config.get("db");
  mongoose.connect(db, { useUnifiedTopology: true }).then(() => {
    winston.info(`Connected to MongoDB ${db}`);
  });
};
