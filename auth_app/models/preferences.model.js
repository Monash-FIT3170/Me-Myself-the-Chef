const mongoose = require("mongoose");

const Preferences = mongoose.model(
  "Preferences",
  new mongoose.Schema({
    ingredient: String
  })
);

module.exports = Preferences;