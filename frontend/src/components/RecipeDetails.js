import React from 'react';
import ReactStars from 'react-rating-stars-component';

// Functional component for displaying recipe details
function RecipeDetails({ title, image, servings, setServings, prepTime, cookTime, adjustIngredients, averageRating }) {

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
      <div className="row pt-5 pb-5 ps-4 white-text text-left" style={{ backgroundColor: '#3E6C4B' }}>
         <div className="container">


            <div className="row">
               <div className="col-md-7" style={{ paddingLeft: "5%" }}>
                  <div className="row">
                     <div className="col-md-8">
                        <h1>{title}</h1>
                     </div>

                     <div className="col mt-2">
                        <button type="button" className="btn btn-danger btn-sm">
                           <i className="bi bi-bookmark-heart"></i> Save
                        </button>
                     </div>

                  </div>

                  <br></br>

                  <div className='row'>
                     <div className="col-md-6">
                        <p>Prep Time: {prepTime > 0 ? prepTime + " mins" : "N/A"}</p>
                        <p>Cook Time: {cookTime} mins</p>
                        <div className="input-group input-group-sm">
                           <span className="input-group-text">Number of Servings:</span>
                           <button className="input-group-text" type="button" onClick={handleDecreaseServings}>-</button>
                           <input type="text" className="form-control text-center" value={servings} readOnly />
                           <button className="input-group-text" type="button" onClick={handleIncreaseServings}>+</button>
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                           {averageRating !== 0 && !isNaN(averageRating) ? (
                              <ReactStars
                                 key={averageRating}
                                 count={5}
                                 size={24}
                                 activeColor="#ffd700"
                                 value={averageRating}
                                 edit={false}
                              />
                           ) : (
                              <p>No Ratings Yet</p> // Placeholder while loading average rating or in case of error
                           )}
                        </div>
                     </div>
                  </div>


               </div>

               <div className="col-md-2 mt-2">

               </div>

               <div className="col-md-3 text-end">
                  <img src={image} alt="Recipe" className="img-fluid me-5" style={{ height: "200px", border: "5px solid white" }} />
               </div>
            </div>


         </div>
      </div>
   );
}

export default RecipeDetails;
