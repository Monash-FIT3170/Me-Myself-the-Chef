import React from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import {useState, useEffect} from "react";


function RecipeRecommendation() {

    const [ingredientList, setIngredientList] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    const [recipeList, setRecipeList] = useState(null);

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
                const response = await fetch("/api/recipes/ingredients/" + ingredientString)
                const json = await response.json()
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
            <IngredientsRecipePane ingredientList={ingredientList}/>

            {/* Display Recipe Pane */}
            <RecipePane recipeList={recipeList}/>
        </div>
    );
}

export default RecipeRecommendation;
