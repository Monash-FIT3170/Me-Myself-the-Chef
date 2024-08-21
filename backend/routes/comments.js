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

// Get average rating for a specific recipeId
router.get('/average-rating/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
  
    try {
      // Find comments that have the specific recipeId
      const comments = await Comment.find({ recipeId });
  
      // Calculate the total rating for the filtered comments
      const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
  
      // Calculate the average rating
      const averageRating = (comments.length === 0) ? 0 : Math.round(totalRating / comments.length);
  
      // Return the average rating
      res.json({ averageRating });
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
        author: req.body.author || 'Anonymous',
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
