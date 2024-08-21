import React from 'react';
import {useState, useEffect} from "react";

// Functional component for displaying recipe details
function RecipeDetails({ id, title, image, servings, setServings, prepTime, cookTime, adjustIngredients }) {

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
 
   const [isSaved, setSaved] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
          try {
              // Cannot use a GET request as we are sending objects to the backend for processing
              const response = await fetch("http://localhost:8080/api/auth/getSavedRecipes", {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-access-token': localStorage.getItem('token')
                  },
              })
              const json = await response.json()
            
              setSaved(json.includes(id))
          } catch (error) {
              console.log(error);
          }
      };
      fetchData();
  }, [id]);

   const saved = async(event) => {
      console.log("hello world")
      const response = await fetch('http://localhost:8080/api/auth/getSavedRecipes', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
          }
      });
      const data = await response.json();

      if (data.includes(id)) {
         return 
      }
      const updatedObj = [...data, id]

      const response2 = await fetch('http://localhost:8080/api/auth/updateSavedRecipes', {
          method: 'POST',
          body: JSON.stringify({saved_recipes: updatedObj}),
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
          }
      });
      console.log(response2)
  }

  const remove = async (event) => {
   console.log("hello world");

   const response = await fetch('http://localhost:8080/api/auth/getSavedRecipes', {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
           'x-access-token': localStorage.getItem('token')
       }
   });
   const data = await response.json();

   if (!data.includes(id)) {
       return;  // If the ID is not in the array, no need to proceed
   }

   // Remove the ID from the array
   const updatedObj = data.filter(recipeId => recipeId !== id);

   const response2 = await fetch('http://localhost:8080/api/auth/updateSavedRecipes', {
       method: 'POST',
       body: JSON.stringify({ saved_recipes: updatedObj }),
       headers: {
           'Content-Type': 'application/json',
           'x-access-token': localStorage.getItem('token')
       }
   });

   console.log(response2);
}


   // Render recipe details UI
   return (
      <div className="row pt-5 pb-5 white-text text-center" style={{ backgroundColor: '#3E6C4B' }}>
         <div className="container">
               <div className="row">
                  <div className="col-md-6">
                     <div className="d-flex justify-content-between align-items-center ps-3">
                           <h1>{title}</h1>
                           {!isSaved &&<button
                                type="button"
                                onClick={(e) => {
                                    saved(e);
                                }}
                                className="btn btn-primary btn-sm me-2" 
                            >
                                Save
                            </button>}
                            {isSaved && <button
                                type="button"
                                onClick={(e) => {
                                    remove(e);
                                }}
                                className="btn btn-danger btn-sm"
                            >
                                Remove
                            </button>}
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
