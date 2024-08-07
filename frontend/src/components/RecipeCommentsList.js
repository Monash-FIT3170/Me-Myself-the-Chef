import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';

function RecipeCommentsList({ recipeId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/comments/${recipeId}`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    console.error('Failed to fetch comments');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [recipeId]);

    return (
        <div className="comments-list mt-4">
            <h3>Previous Comments</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment mb-3">
                        <div className="comment-rating">
                            <ReactStars
                                count={5}
                                size={24}
                                value={comment.rating}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="comment-text">{comment.comment}</div>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}

export default RecipeCommentsList;
