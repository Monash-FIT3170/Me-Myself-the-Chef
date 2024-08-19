import React from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import {useState, useEffect} from "react";


function SavedRecipe() {

    const [recipeList, setRecipeList] = useState(null);

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
            {/* Display Recipe Pane */}
            {/* <RecipePane recipeList={recipeList}/>   */}

            {recipeList}  
        
        </div>
    );
}

export default SavedRecipe;
