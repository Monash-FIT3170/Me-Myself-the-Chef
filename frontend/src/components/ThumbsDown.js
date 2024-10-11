import React from 'react';

function ThumbsDown({ thumbsDownCount, handleThumbsDown }) {
  return (
    <div className="thumb-container">
      <span className="thumbs" onClick={handleThumbsDown}>
        &#x1F44E;  
      </span>
      <span>{thumbsDownCount}</span> 
    </div>
  );
}

export default ThumbsDown;
