const mongoose = require("mongoose");

const Result = mongoose.model(
  "Result",
  new mongoose.Schema({
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    test: {
      type: mongoose.Types.ObjectId,
      ref: "Test",
    },
    course:String,
    correct: Number,
    incorrect: Number,
    certificateFile: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Result;
