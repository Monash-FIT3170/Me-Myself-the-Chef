import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "09861c68c07140d8a96e353c8d4f86cc";

export function RecipeList({ingredientList, setHomePage, setExpandedRecipeId}) {
   const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
         //debugger;
         let ingredientString = "";
         for (let i = 0; i < ingredientList.length; i++) {
            ingredientString += ingredientList[i].title;

            // check to add ",+"
            if (i != (ingredientList.length - 1)) {
               ingredientString += ",+"
            }
         }
			try {
				const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
               params: {
                  apiKey: API_KEY,
                  ingredients: ingredientString,
                  number: 2
               }
            })
				setRecipeList(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		
		fetchData();
	}, []);

   return (
      <>
         <h1 className="header">Recommended Recipes</h1>
         <ul >
            {recipeList.map(recipe => {
               return (
                  <li key={recipe.id}>
                     <p>
                        <b>{recipe.title}</b>
                        <button onClick={() => {
                           setHomePage(false);
                           setExpandedRecipeId(recipe.id);
                        }} className="btn">See More</button>
                     </p>
                     <img src={recipe.image}/>
                  </li>
               )
            })}
         </ul>
      </>
   )
}