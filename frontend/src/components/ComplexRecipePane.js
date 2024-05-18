import React from 'react';
import '../css/base.css'
import ComplexRecipeCard from "./ComplexRecipeCard";
import { Link } from "react-router-dom";

function ComplexRecipePane({ recipeList }) {
   if (recipeList == null) {
      return (
         <div className="col-md-9" style={{ backgroundColor: '#ECECEC' }}>
            <div className="row pt-5 text-center">
               <h2>Recipe Recommendations</h2>
               <h5> No recipes found.</h5>
               <h5>Please try a different combination of ingredients.</h5>
               <div className="horiz_line" style={{ backgroundColor: '#000000' }}></div>
            </div>
         </div>
      )
   }

   return (
      <div className="col-md-9" style={{ backgroundColor: '#ECECEC' }}>
         <div className="row pt-5 text-center">
            <h2>Recipe Recommendations</h2>
            <h5> You have {recipeList.length} recommendations</h5>
            <div className="horiz_line" style={{ backgroundColor: '#000000' }}></div>
         </div>
         {/* Display recipe generation result */}
         <div className="container">
            <div className="row">
                {/* {recipeList.map(item => (
                    <div key={item.id}>{item.title}</div>
                ))} */}

               {recipeList.map(function (recipe) {
                  return <ComplexRecipeCard recipe={recipe} key={recipe.id}/>
               })}

            </div>
         </div>
      </div>
   )
}

export default ComplexRecipePane;