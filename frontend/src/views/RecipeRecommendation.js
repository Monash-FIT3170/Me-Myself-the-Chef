import React from 'react';
import '../css/base.css'
import IngredientsRecipePane from '../components/IngredientsRecipePane';
import RecipePane from '../components/RecipePane';
import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = "09861c68c07140d8a96e353c8d4f86cc";

// function to call Spoonacular API and generate recipes based off of ingredients and preferences
function RecipeRecommendation() {

    // set ingredients list to user unput 
    const [ingredientList, setIngredientList] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    // preferences stored as an object 
    const [preferenceList, setPreferences] = useState(() => {
        const localValue = localStorage.getItem("preferences")
        if (localValue == null) return {}
        return JSON.parse(localValue)
    });

    const [recipeList, setRecipeList] = useState();

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList))
    }, [ingredientList]);

    useEffect(() => {
        const fetchData = async () => {
            let ingredientString = "";      // need to pass ingredients into API as one string 
            for (let i = 0; i < ingredientList.length; i++) {
                ingredientString += ingredientList[i].title;

                // check to add ",+"
                if (i !== (ingredientList.length - 1)) {
                    ingredientString += ",+"
                }
            }

            // get dietary requirements at preferenceList[0]
            let dietaries = preferenceList.dietaryRequirements
            dietaries = [{"id": 0, "state": "True", "name": "Vegetarian"}]
            let dietaryString = ""
            for (let i = 0; i < dietaries.length; i++) {
                //// this will depend on how preferences are being stores 
                
                if (dietaries[i].state == "True"){
                    dietaryString += dietaries[i].name;
                }
                // check to add ",+"
                if (i !== (dietaries.length - 1)) {
                    ingredientString += ",+"
                }
            }
            let maxPrepTime = preferenceList.maxPrepTime
            let cannot_eat = preferenceList.allergies


            //dietaryString = ""
            maxPrepTime = 80
            cannot_eat=""

            // get dietary combination 
            // get maxPrepTime 

            try {
                // original search "https://api.spoonacular.com/recipes/findByIngredients"
                //// try complex search https://api.spoonacular.com/recipes/complexSearch
                /// params: includeIngredients, excludeIngredients
                const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
                    params: {
                        apiKey: API_KEY,
                        ingredients: ingredientString,
                        number: 3,   // number of recipes to return 
                        diet: dietaryString,
                        maxReadyTime: maxPrepTime,
                        intolerances: cannot_eat
                        /// can potentially add --> addRecipeInformation: True to reduce the number of API calls required 
                        // ignorePantry parameter can be used to ignore flour, salt, etc. 
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
