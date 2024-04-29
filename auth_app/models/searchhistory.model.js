const mongoose = require("mongoose");

const SearchHistory = mongoose.model(
  "SearchHistory",
  new mongoose.Schema({
    date: Date,
    entry: String,
  })
);

module.exports = SearchHistory;