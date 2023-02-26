const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    code: String,
    answers: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Test;
