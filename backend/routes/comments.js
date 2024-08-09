const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');

// Get comments by recipeId
router.get('/:recipeId', async (req, res) => {
    try {
        const comments = await Comment.find({ recipeId: req.params.recipeId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        recipeId: req.body.recipeId,
        rating: req.body.rating,
        text: req.body.text,
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
