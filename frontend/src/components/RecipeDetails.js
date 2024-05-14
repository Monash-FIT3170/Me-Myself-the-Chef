import React from 'react';

function RecipeDetails({ title, image, servings, prepTime, cookTime }) {
   return (
      <div className="row pt-5 pb-5 white-text text-center" style={{ backgroundColor: '#3E6C4B' }}>
         {/* Top section for recipe details */}
         <div className="container">
            <div className="row">
               {/* Left column for recipe details */}
               <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center ps-3">
                     {/* Wrapper for recipe title and button */}
                     {/* Recipe Title */}
                     <h1>{title}</h1>
                     {/* Save button */}
                     <button type="button" className="btn btn-danger btn-sm">
                        <i className="bi bi-bookmark-heart"></i> Save
                     </button>
                  </div>
                  {/* Recipe Details */}
                  <p>Prep Time: {prepTime}</p>
                  <p>Cook Time: {cookTime}</p>
                  <div className="col-md-6 mx-auto">
                     <div className="input-group input-group-sm">
                        <span className="input-group-text">Number of Servings:</span>
                        <button className="input-group-text" id="btnGroupAddon" type="button">-</button>
                        <input type="text" className="form-control text-center" value={servings} />
                        <button className="input-group-text" id="btnGroupAddon" type="button">+</button>
                     </div>
                  </div>
               </div>
               {/* Right column for recipe image */}
               <div className="col-md-6 text-end">
                  {/* Recipe Image */}
                  <img src={image} alt="Recipe Image" className="img-fluid pe-5" />
               </div>
            </div>
         </div>
      </div>
   );

}

export default RecipeDetails;