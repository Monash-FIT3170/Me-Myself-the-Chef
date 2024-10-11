import React from 'react';

function ThumbsUp({ thumbsUpCount, handleThumbsUp }) {
  return (
    <div className="thumb-container">
      <span className="thumbs" onClick={handleThumbsUp}>
        &#128077;  
      </span>
      <span>{thumbsUpCount}</span> 
    </div>
  );
}

export default ThumbsUp;
