const config = require("config");
module.exports = function () {
  //export vidly_jwtPrivateKey=MyJWTPrivateKey:D
  if (!config.get("jwtPrivateKey")) {
    throw new Error.error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
