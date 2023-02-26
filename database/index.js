const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

mongoose.connect(config.database, (error) => {
  if (error) {
    logger.error("[database]: Couldn't establish connection to the database!", {
      message: error.message,
    });
    process.exit(1);
  }
  logger.info("[database]: Database connection established!");
});
