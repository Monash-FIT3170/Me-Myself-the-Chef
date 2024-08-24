const mongoose = require("mongoose");

const AppUser = mongoose.model(
    "AppUser",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        search_history: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SearchHistory"
            }
        ],
        preferences: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Preferences"
            }
        ],
        saved_recipes: [
            {
                type: Number
            }
        ]
    })
);

module.exports = AppUser;