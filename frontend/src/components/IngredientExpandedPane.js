import React from "react";

function IngredientExpandedPane({ ingredients }) {
   return (
       <div className="row pb-5 flex-fill" style={{ backgroundColor: '#5F926E' }}>
           <div className="col-md-12">
               <div className="container-fluid">
                   <div className="row pt-5 text-center">
                       <h2>Ingredients</h2>
                       <div className="horiz_line"></div>
                   </div>

                   <div className="row text-left">
                       <div className="col-md-12">
                           {ingredients.map((ingredient, index) => (
                               <div key={index} className="form-check">
                                   <input className="form-check-input" type="checkbox" value="" id={`ingredient-${index}`} />
                                   <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                                       {ingredient}
                                   </label>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
};

export default IngredientExpandedPane;