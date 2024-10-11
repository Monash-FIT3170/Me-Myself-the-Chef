const mongoose = require("mongoose");

const AppUser = mongoose.model(
    "AppUser",
    new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true,
            minlength: [1, "Username cannot be empty"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
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
                type: String
            }
        ]
    })
);

module.exports = AppUser;