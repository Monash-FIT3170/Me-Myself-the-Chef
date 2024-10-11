import React, { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import ThumbsUp from './ThumbsUp';
import ThumbsDown from './ThumbsDown';
import '../css/recipe-comments-list.css';  // Import the CSS file

function RecipeCommentsList({ recipeId, comments, setComments, fetchAverageRating }) {
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${recipeId}`);
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

    const handleThumbsUp = async (commentId) => {
        const updatedCommentList = comments.map(comment => {
            if (comment._id === commentId) {
                const updatedThumbsUp = (comment.thumbsUp || 0) + 1;
                return { ...comment, thumbsUp: updatedThumbsUp };
            }
            return comment;
        });

        setComments(updatedCommentList);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentId}/thumbs-up`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to update thumbs up');
            }
        } catch (error) {
            console.error('Error updating thumbs up:', error);
        }
    };

    // Function to handle thumbs down
    const handleThumbsDown = async (commentId) => {
        const updatedCommentList = comments.map(comment => {
            if (comment._id === commentId) {
                const updatedThumbsDown = (comment.thumbsDown || 0) + 1;
                return { ...comment, thumbsDown: updatedThumbsDown };
            }
            return comment;
        });

        setComments(updatedCommentList);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${commentId}/thumbs-down`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to update thumbs down');
            }
        } catch (error) {
            console.error('Error updating thumbs down:', error);
        }
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

                            {/* Thumbs up/down components */}
                            <div className="comment-actions">
                                <ThumbsUp
                                    thumbsUpCount={comment.thumbsUp || 0}  // Default to 0 if undefined or null
                                    handleThumbsUp={() => handleThumbsUp(comment._id)}
                                />
                                <ThumbsDown
                                    thumbsDownCount={comment.thumbsDown || 0}  // Default to 0 if undefined or null
                                    handleThumbsDown={() => {
                                        handleThumbsDown(comment._id)}}
                                />
                            </div>

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