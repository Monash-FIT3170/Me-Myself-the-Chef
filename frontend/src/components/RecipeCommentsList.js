import React, { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import '../css/recipe-comments-list.css';  // Import the CSS file

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
    }, [recipeId, setComments, fetchAverageRating]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="comments-list">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <div className="comment-icon">
                            {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
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
                            </div>
                            <div className="comment-date">
                                {formatDate(comment.createdAt)}
                            </div>
                            <div className="comment-text">{comment.text}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}

export default RecipeCommentsList;