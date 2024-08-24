import React from 'react';
import '../css/base.css'
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

function RecipePane({ recipeList, title }) {
   if (recipeList == null) {
      return (
         <div className="col-md-9" style={{ backgroundColor: '#ECECEC' }}>
            <div className="row pt-5 text-center">
               <h2>Recipe Recommendations</h2>

               <h5 className="pt-3"> No recipes found.</h5>
               <h5>Please try a different combination of ingredients.</h5>

               <div className="horiz_line" style={{ backgroundColor: '#000000' }}></div>
            </div>
         </div>
      )
   }

   return (
      <div className="col-md-9 recipe-container" style={{ backgroundColor: '#ECECEC'}}>

         <div className="row pt-5 pb-5 text-center">
            <h2>{title}</h2>

            <h6 className="pt-3"> You have <span className="recipe_number">{recipeList.length}</span> {title}</h6>

            {/* <div className="horiz_line" style={{ backgroundColor: '#000000' }}></div> */}

         </div>

         {/* Display recipe generation result */}
         <div className="container">
            <div className="row">
               {recipeList.map(recipe => {
                  return (
                     <RecipeCard recipe={recipe} key={recipe.id}/>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default RecipePane;