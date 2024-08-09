import React from 'react';
import ReactStars from 'react-rating-stars-component';

// Functional component for displaying recipe details
function RecipeDetails({ title, image, servings, setServings, prepTime, cookTime, adjustIngredients , averageRating}) {

   // Function to handle increasing servings
   const handleIncreaseServings = () => {
      const newServings = servings + 1;
      setServings(newServings);
      adjustIngredients(newServings);
   };

   // Function to handle decreasing servings
   const handleDecreaseServings = () => {
      // Ensure servings don't go below 1
      if (servings > 1) {
         const newServings = servings - 1;
         setServings(newServings);
         adjustIngredients(newServings);
      }
   };

   // Render recipe details UI
   return (
      <div className="row pt-5 pb-5 white-text text-center" style={{ backgroundColor: '#3E6C4B' }}>
         <div className="container">
               <div className="row">
                  <div className="col-md-6">
                     <div className="d-flex justify-content-between align-items-center ps-3">
                           <h1>{title}</h1>
                           <button type="button" className="btn btn-danger btn-sm">
                              <i className="bi bi-bookmark-heart"></i> Save
                           </button>
                     </div>
                     <p>Prep Time: {prepTime > 0 ? prepTime + " mins" : "N/A"}</p>
                     <p>Cook Time: {cookTime} mins</p>
                     <div className="col-md-6 mx-auto">
                           <div className="input-group input-group-sm">
                              <span className="input-group-text">Number of Servings:</span>
                              <button className="input-group-text" type="button" onClick={handleDecreaseServings}>-</button>
                              <input type="text" className="form-control text-center" value={servings} readOnly />
                              <button className="input-group-text" type="button" onClick={handleIncreaseServings}>+</button>
                           </div>
                           <div className="mt-3 d-flex justify-content-center">
                              <ReactStars
                                 count={5}
                                 size={24}
                                 activeColor="#ffd700"
                                 value={averageRating} // Set the initial rating value
                                 edit={false} // Set to true if you want it to be interactive
                              />
                           </div>
                     </div>
                  </div>
                  <div className="col-md-6 text-end">
                     <img src={image} alt="Recipe" className="img-fluid pe-5" />
                  </div>
               </div>
         </div>
      </div>
   );
}

export default RecipeDetails;
