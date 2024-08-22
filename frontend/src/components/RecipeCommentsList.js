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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="comments-list mt-4">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment mb-3 d-flex" style={{ marginBottom: '20px', border: '1px solid grey', borderRadius: '5px', padding: '10px' }}>
                        <div className="comment-icon" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            backgroundColor: '#5F926E', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'white', 
                            fontSize: '18px', 
                            marginRight: '15px',
                            marginLeft: '5px',
                            marginTop: '10px',
                            flexShrink: 0,
                            alignSelf: 'flex-start' 
                        }}>
                            {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-content" style={{ flex: 1 }}>
                            <div className="comment-header d-flex justify-content-between align-items-center">
                                <div className="comment-author" style={{ fontWeight: 'bold', marginRight: '10px' }}>{comment.author}</div>
                                <div className="comment-rating" style={{ marginRight: '10px' }}>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={comment.rating}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                            <div className="comment-date" style={{ fontSize: '0.9em', color: 'grey' }}>
                                {formatDate(comment.createdAt)}
                            </div>
                            <div className="comment-text" style={{marginTop: '5px', marginBottom: '10px' }}>{comment.text}</div>
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