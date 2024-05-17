import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeDetails from '../components/RecipeDetails';
import NutritionPane from '../components/NutritionPane';
import IngredientExpandedPane from '../components/IngredientExpandedPane';

function Recipe() {
    const [recipeId, setRecipeId] = useState(useLocation().state);
    const [recipeInfo, setRecipeInfo] = useState();
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [nutrition, setNutrition] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                    params: {
                        apiKey: process.env.REACT_APP_API_KEY,
                        includeNutrition: true,
                    }
                })
                console.log(response.data);
                console.log("API Response - Nutrition:", response.data.nutrition);
                setRecipeInfo(response.data);
                setInstructions(formatInstructions(response.data.analyzedInstructions[0].steps));
                setIngredients(formatIngredients(response.data.extendedIngredients));
               
                // Extract nutritional data from the nutrients array
                const nutrients = response.data.nutrition.nutrients;

                // Format the nutritional data if necessary
                const formattedNutrition = formatNutrition(nutrients);

                // Set the nutrition state with the formatted data
                setNutrition(formattedNutrition);

            } catch (error) {
                console.log(error);
            }
        };

        if (recipeInfo == null) {
            fetchData();
        } else {
            console.log(recipeInfo);
        }
        fetchData();
    }, []);

    function formatInstructions(instructions) {
        let formattedInstructions = [];
        for (let i = 0; i < instructions.length; i++) {
            formattedInstructions.push(`${instructions[i].step}`);
        }
        return formattedInstructions;
    }

    function formatIngredients(ingredients) {
        let formattedIngredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            formattedIngredients.push(`${ingredients[i].measures.metric.amount} ${ingredients[i].measures.metric.unitShort} ${ingredients[i].name}`);
        }
        return formattedIngredients;
    }
    
    function formatNutrition(nutritionInfo) {
        let formattedNutrition = [];

        // calorie info
        formattedNutrition.push(`${nutritionInfo[0].name} ${nutritionInfo[0].amount} ${nutritionInfo[0].unit}`);
    
        // fat info
        formattedNutrition.push(`${nutritionInfo[1].name} ${nutritionInfo[1].amount} ${nutritionInfo[1].unit}`);

        // carb info
        formattedNutrition.push(`${nutritionInfo[3].name} ${nutritionInfo[3].amount} ${nutritionInfo[3].unit}`);

        // sugar info
        formattedNutrition.push(`${nutritionInfo[5].name} ${nutritionInfo[5].amount} ${nutritionInfo[5].unit}`);

        return formattedNutrition;
    }
   

    // Placeholder recipe data
    const recipeData = {
        title: "Crispy Pork Belly Banh Mi",
        image: "static/images/banh_mi.jpeg",
        servings: 5,
        prepTime: "15 mins",
        cookTime: "3 hrs",
        ingredients: [
            "4 long bread rolls",
            // Add more ingredients here
        ],
        nutrition: {
            calories: "554cal",
            percentDailyValue: "28%"
            // Add more nutrition information here
        },
        instructions: [
            "Dry skin overnight: Place pork belly on a plate...",
            // Add more instructions here
        ]
    };
    if (recipeInfo == null) {
        return (
            <></>
        )
    }

    return (
        <div className="row flex-fill">
            <div className="col-md-3 d-flex flex-column white-text">
                <IngredientExpandedPane ingredients={ingredients} />
                <NutritionPane nutrition={nutrition} />
            </div>

            <div className="col-md-9 d-flex flex-column">
                <RecipeDetails
                    title={recipeInfo.title}
                    image={recipeInfo.image}
                    servings={recipeInfo.servings}
                    prepTime={recipeInfo.preparationMinutes}
                    cookTime={recipeInfo.readyInMinutes}
                />
                <RecipeInstructions instructions={instructions} />
            </div>
        </div>
    );
};

export default Recipe;
