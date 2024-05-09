import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "09861c68c07140d8a96e353c8d4f86cc";

export function ExpandedRecipe({expandedRecipeId, returnToHome}) {
   const [recipeInfo, setRecipeInfo] = useState();
   const [instructions, setInstructions] = useState([]);

   useEffect(() => {
		const fetchData = async () => {
         //debugger;
         // let ingredientString = "";
         // for (let i = 0; i < ingredientList.length; i++) {
         //    ingredientString += ingredientList[i].title;

         //    // check to add ",+"
         //    if (i != (ingredientList.length - 1)) {
         //       ingredientString += ",+"
         //    }
         // }
			//debugger;
         try {
				const response = await axios.get(`https://api.spoonacular.com/recipes/${expandedRecipeId}/information`, {
               params: {
                  apiKey: API_KEY,
                  includeNutrition: true,
               }
            })
				setRecipeInfo(response.data);
            setInstructions(response.data.analyzedInstructions[0].steps);
			} catch (error) {
				console.log(error);
			}
		};
		
		fetchData();
	}, []);
   

   if (recipeInfo != null) {
      return (
         <>
         <h1>Expanded Recipe page {expandedRecipeId}</h1>
         {console.log(instructions)}
         <ul>
            {instructions.map(instruction => {
               return (
                  <li key={crypto.randomUUID()}>{instruction.number}. {instruction.step}</li>
               )
            })}
         </ul>
         <button onClick={() => returnToHome()}>Return Home</button>
         </>
      )
   }

   return (
      <>
      <h1>Expanded Recipe page {expandedRecipeId}</h1>
      <ul>
         {/* {recipeInfo.analyzedInstructions.map(instruction => {
            return (
               <li>{instruction}</li>
            )
         })} */}
      </ul>
      <button onClick={() => returnToHome()}>Return Home</button>
      </>
   )
}