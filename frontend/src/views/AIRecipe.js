import React from 'react';
import { useEffect, useState } from "react";
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeDetails from '../components/RecipeDetails';
import NutritionInformation from '../components/NutritionInformation';
import IngredientExpandedPane from '../components/IngredientExpandedPane';


function Recipe() {
    // const location = useLocation();
    // const [recipeId, setRecipeId] = useState(location.state);
    const [recipeInfo, setRecipeInfo] = useState(null);
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [originalIngredients, setOriginalIngredients] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [servings, setServings] = useState(1);
    const [originalServings, setOriginalServings] = useState(null);
    // for dependencies array?
    const [recipe, setRecipe] = useState(null);

    const [scaledNutrition, setScaledNutrition] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setRecipe(localStorage.getItem("AIrecipe"));
                const json = JSON.parse(recipe); // Safe Parse
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
                setScaledNutrition(formatScaledNutrition(nutrition, json.servings)) 
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [recipe, servings, originalServings]);

    useEffect(() => {
            
        setScaledNutrition(formatScaledNutrition(nutrition, servings))   

    }, [nutrition]);
    
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
    
    // // Format nutrition details
    // function formatNutrition(nutrients) {
    //     return nutrients.map(nutrient => `${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`);
    // }

    // Format nutrition details
    function formatNutrition(nutrients) {
        return nutrients.map(nutrient => [
            nutrient.name,
            parseInt(nutrient.amount / originalServings, 10),
            nutrient.unit
        ]
    )}

    function formatScaledNutrition(nutrients, servings) {
        return nutrients.map(nutrient => [
            nutrient[0],
            parseInt(nutrient[1] * servings, 10),
            nutrient[2]
        ]
    )}

    // Adjust ingredients based on servings
    function adjustIngredients(newServings) {
        setServings(newServings);
        setIngredients(formatIngredients(originalIngredients, newServings));
        setScaledNutrition(formatScaledNutrition(nutrition, newServings));
    }


    if (!recipeInfo) {
        return <></>;
    }

    // Render recipe details, ingredients, nutrition, and instructions
    return (
        <div className="row flex-fill">
            <div className="col-md-3 d-flex flex-column white-text">
                <IngredientExpandedPane ingredients={ingredients} />
                <NutritionInformation 
                nutrition={nutrition} 
                setNutrition={setNutrition} 
                scaledNutrition={scaledNutrition}
                setScaledNutrition={setScaledNutrition}
                servings={servings} />
            </div>
            <div className="col-md-9 d-flex flex-column">
                <RecipeDetails
                    id={recipeInfo.id}
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
