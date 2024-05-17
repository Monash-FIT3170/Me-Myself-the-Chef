import React from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import { useState, useEffect } from "react";
import axios from "axios";

function RecipeRecommendation() {

    const [ingredientList, setIngredientList] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    const [recipeList, setRecipeList] = useState();

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList))
    }, [ingredientList]);

    useEffect(() => {
        const fetchData = async () => {
            let ingredientString = "";
            for (let i = 0; i < ingredientList.length; i++) {
                ingredientString += ingredientList[i].title;

                // check to add ",+"
                if (i !== (ingredientList.length - 1)) {
                    ingredientString += ",+"
                }
            }
            try {
                const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
                    params: {
                        apiKey: process.env.REACT_APP_API_KEY,
                        ingredients: ingredientString,
                        number: 3
                    }
                })
                setRecipeList(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
		
        // check if data has been collected already
        if (recipeList == null) {
            fetchData();
        } else {
            console.log(recipeList);
        }
	}, []);


    return (
        <div className="row flex-fill">
            {/* Ingredients Pane */}
            <IngredientsRecipePane ingredientList={ingredientList}/>

            {/* Display Recipe Pane */}
            <RecipePane recipeList={recipeList}/>

        </div>

    );
}

export default RecipeRecommendation;
