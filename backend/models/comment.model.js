const mongoose = require("mongoose");

const DietaryRequirementsSchema = new mongoose.Schema({
    recipeId: {type: Number, required: true},
    rating: {type: Number, required: true},
    author: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;