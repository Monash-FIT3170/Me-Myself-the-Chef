import React, { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';

function RecipeCommentsList({ recipeId, comments, setComments, fetchAverageRating }) {
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/comments/${recipeId}`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                    fetchAverageRating();

                } else {
                    console.error('Failed to fetch comments');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [recipeId, setComments]);

    return (
        <div className="comments-list mt-4">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment mb-3" style={{ marginBottom: '20px' , border: '1px solid grey', borderRadius: '5px', padding: '10px'}}>
                        <div className="comment-author">{comment.author}</div>
                        <div className="comment-rating">
                            <ReactStars
                                count={5}
                                size={24}
                                value={comment.rating}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="comment-text">{comment.text}</div>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}

export default RecipeCommentsList;
