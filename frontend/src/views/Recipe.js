import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeDetails from '../components/RecipeDetails';
import NutritionPane from '../components/NutritionPane';
import IngredientExpandedPane from '../components/IngredientExpandedPane';


function Recipe() {
    const location = useLocation();
    const [recipeId, setRecipeId] = useState(location.state);
    const [recipeInfo, setRecipeInfo] = useState(null);
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [originalIngredients, setOriginalIngredients] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [servings, setServings] = useState(1);
    const [originalServings, setOriginalServings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/recipes/id/' + recipeId)
                const json = await response.json()
                console.log(json);
                setRecipeInfo(json);

                const initialServings = json.servings;
                // Set initial servings and original servings only once
                if (originalServings === null) {
                    setOriginalServings(initialServings);
                    setServings(initialServings);
                }
                // Format and set instructions, ingredients, and nutrition
                setInstructions(formatInstructions(json.analyzedInstructions[0].steps));
                setIngredients(formatIngredients(json.extendedIngredients, initialServings));
                setOriginalIngredients(json.extendedIngredients);
                setNutrition(formatNutrition(json.nutrition.nutrients));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [recipeId, originalServings]);

    // Format instructions to extract step text
    function formatInstructions(steps) {
        return steps.map(step => step.step);
    }

    // Format ingredients based on servings
    function formatIngredients(ingredients, servings) {
        return ingredients.map(ingredient => {
            let newAmount = (ingredient.measures.metric.amount / originalServings) * servings;
            // Round to 2 decimal places if not a whole number
            newAmount = Number.isInteger(newAmount) ? newAmount.toFixed(0) : newAmount.toFixed(2);
            return `${newAmount} ${ingredient.measures.metric.unitShort} ${ingredient.nameClean}`;
        });
    }
    
    // Format nutrition details
    function formatNutrition(nutrients) {
        return nutrients.map(nutrient => `${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`);
    }

    // Adjust ingredients based on servings
    function adjustIngredients(newServings) {
        setServings(newServings);
        setIngredients(formatIngredients(originalIngredients, newServings));
    }

    if (!recipeInfo) {
        return <></>;
    }

    // Render recipe details, ingredients, nutrition, and instructions
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
                    servings={servings}
                    setServings={setServings}
                    prepTime={recipeInfo.preparationMinutes}
                    cookTime={recipeInfo.readyInMinutes}
                    adjustIngredients={adjustIngredients}
                />
                <RecipeInstructions instructions={instructions} />
            </div>
        </div>
    );
}

export default Recipe;
