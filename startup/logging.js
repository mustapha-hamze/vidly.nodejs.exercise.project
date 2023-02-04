const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
//exceptions.handle
//uncaughtException.log
module.exports = function () {
  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // throw new Error("Something failed during startup");
  // const p = Promise.reject(new Error("Something wrong happened"));
  // p.then(() => console.log("Done"));
  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtException.log" })
  );

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      level: "error",
    })
  );
};
