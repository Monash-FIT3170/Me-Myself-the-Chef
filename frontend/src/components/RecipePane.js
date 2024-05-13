import React from 'react';
import '../css/base.css'
import RecipeCard from "./RecipeCard";

function RecipePane({ recipeList }) {

   return (
      <div className="col-md-9" style={{ backgroundColor: '#ECECEC' }}>
         <div className="row pt-5 text-center">
            <h2>Recipe Recommendations</h2>
            <h5> You have 8 recommendations</h5>
            <div className="horiz_line" style={{ backgroundColor: '#000000' }}></div>
         </div>
         {/* Display recipe generation result */}
         <div className="container">
            <div className="row">
               {[...Array(8).keys()].map(i => <RecipeCard key={i + 1} recipeNumber={i + 1} />)}
            </div>
         </div>
      </div>
   )
}

export default RecipePane;