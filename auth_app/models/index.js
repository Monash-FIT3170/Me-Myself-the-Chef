const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.appuser = require("./appuser.model");
db.searchhistory = require("./searchhistory.model");
db.preferences = require("./preferences.model");

module.exports = db;