import React, { useContext, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import RecipeCommentsList from './RecipeCommentsList';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function RecipeComment({ recipeId, fetchAverageRating }) {
    const { isLoggedIn, username } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);


    const handleCommentChange = (e) => setComment(e.target.value);
    const handleRatingChange = (newRating) => setRating(newRating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const author = isLoggedIn ? username : 'Anonymous';
            const response = await axios.post('http://localhost:8080/api/comments', { recipeId, rating, text: comment, author });
            setComments([...comments, response.data]);
            setComment('');
            setRating(0);

            await fetchAverageRating();
        } catch (error) {
            console.error("There was an error posting the comment!", error);
        }
    };

    return (
        <div className="row mt-4 text-left" style={{ padding: '20px' }}>
            <div className="col-md-12">
                <div>
                    <h2>Reviews</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" style={{ border: ' 1px solid #3E6C4B', borderRadius: '5px', padding: '10px'}}>
                        <label htmlFor="comment" className="form-label">Add a Comment</label>
                        <div className="mb-3 text-center">
                            <ReactStars
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                value={rating}
                                onChange={handleRatingChange}
                                key={rating}
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
                        <button type="submit" className="btn" style={{ backgroundColor: '#3E6C4B', color: 'white' }}>Comment</button>
                    </div>
                </form>
                <RecipeCommentsList recipeId={recipeId} comments={comments} setComments={setComments} fetchAverageRating={fetchAverageRating}/>
            </div>
        </div>
    );
}

export default RecipeComment;
