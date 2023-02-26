const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    school: String,
    group: String,
    district: String,
    telegramId: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Student;
