import React, { useContext, useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import RecipeCommentsList from './RecipeCommentsList';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function RecipeComment({ recipeId, fetchAverageRating }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('Anonymous');

    useEffect(() => {
        // Retrieve username from local storage if logged in
        if (isLoggedIn) {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername.split('@')[0]); // Extract the part before '@' in the username
            }
        }
    }, [isLoggedIn]);

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleRatingChange = (newRating) => setRating(newRating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const author = username;
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comments`, { recipeId, rating, text: comment, author });
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
                <form onSubmit={handleSubmit}>
                    <h2 className="form-label">Leave a Comment</h2>
                    <div className="mb-3" style={{ border: '1px solid #3E6C4B', borderRadius: '5px', padding: '10px'}}>
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
                <div>
                    <h2>Comments</h2>
                </div>
                <RecipeCommentsList recipeId={recipeId} comments={comments} setComments={setComments} fetchAverageRating={fetchAverageRating}/>
            </div>
        </div>
    );
}

export default RecipeComment;