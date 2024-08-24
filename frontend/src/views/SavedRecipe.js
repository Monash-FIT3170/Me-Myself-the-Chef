import React, {useContext} from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import {useState, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";


function SavedRecipe() {
    const { isLoggedIn } = useContext(AuthContext);

    const [ingredients, setIngredients] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
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
                const temp = []
                for (let i = 0; i<json.length; i++) {
                    const response = await fetch("http://localhost:8080/api/recipes/id/" + json[i], {
                        method: 'GET',
                    })
                    const recipe = await response.json()
                    temp.push({...recipe})
                }
                setRecipeList(temp)
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
            {(isLoggedIn) ? (
                <div className="row flex-fill">
                {/* Ingredients Pane */}
                <IngredientsRecipePane ingredientList={ingredients}/>

                {/* Display Recipe Pane */}
                <RecipePane recipeList={recipeList} title={"Saved Recipes"}/>
                </div>
            ) : (
                <div className="mt-5 text-center">
                    <h3> You must be logged in! </h3>
                </div>
            )}
        </div>
    );
}

export default SavedRecipe;
