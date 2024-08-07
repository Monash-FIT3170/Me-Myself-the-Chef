import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import RecipeCommentsList from './RecipeCommentsList';
import axios from 'axios';

function RecipeComment({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleRatingChange = (newRating) => setRating(newRating);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/comments', { recipeId, rating, comment })
          .then(response => {
            setComments([...comments, response.data]);
            setComment('');
            setRating(0);
          })
          .catch(error => {
            console.error("There was an error posting the comment!", error);
          });
      };

    return (
        <div className="row mt-4 text-left">
            <div className="col-md-12">
                {/* <div className="text-center"> */}
                <div>
                    <h2>Reviews</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Add a Comment</label>
                        <div className="mb-3 text-center">
                            <ReactStars
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                value={rating}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <textarea
                            className="form-control"
                            id="comment"
                            rows="3"
                            value={comment}
                            placeholder="Type here..."
                            onChange={handleCommentChange}
                            required
                            style={{ color: comment === '' ? 'grey' : 'black' }}
                            onFocus={(e) => e.target.style.color = 'black'}
                        ></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn" style={{ backgroundColor: '#3E6C4B', color: 'white' }}>Submit</button>
                    </div>
                </form>
                <RecipeCommentsList recipeId={recipeId} />
            </div>
        </div>
    );
}

export default RecipeComment;
