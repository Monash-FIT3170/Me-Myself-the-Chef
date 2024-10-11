const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    recipeId: { type: String, required: true },
    rating: { type: Number, required: true },
    author: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    thumbsUp: { type: Number, default: 0},  
    thumbsDown: { type: Number, default: 0 }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
