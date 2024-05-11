const mongoose = require("mongoose");

const SearchHistory = mongoose.model(
  "SearchHistory",
  new mongoose.Schema({
    date: String,
    entry: String
  })
);

module.exports = SearchHistory;