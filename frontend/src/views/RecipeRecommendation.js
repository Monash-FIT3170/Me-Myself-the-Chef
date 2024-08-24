import React from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import {useState, useEffect} from "react";


function RecipeRecommendation() {

    const [ingredients, setIngredients] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    const [excIngredients, setDIngredientList] = useState(() => {
        const localValue = localStorage.getItem("DINGREDIENTS") // check if we also need to change this 
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    let preferences = localStorage.getItem("preferences")
    if (preferences != null) {
        preferences = JSON.parse(preferences)
    }

    const [recipeList, setRecipeList] = useState(null);

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredients))
    }, [ingredients]);

    useEffect(() => {
        localStorage.setItem("DINGREDIENTS", JSON.stringify(excIngredients))
    }, [excIngredients]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cannot use a GET request as we are sending objects to the backend for processing
                const response = await fetch("http://localhost:8080/api/recipes/complexSearch", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ingredients, preferences, excIngredients})
                })
                const json = await response.json()
                console.log(json)
                setRecipeList(json);
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
            <IngredientsRecipePane ingredientList={ingredients}/>

            {/* Display Recipe Pane */}
            <RecipePane recipeList={recipeList} title={"Recipe Recommendations"}/>
        </div>
    );
}

export default RecipeRecommendation;
