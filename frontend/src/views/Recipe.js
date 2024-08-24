import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeDetails from '../components/RecipeDetails';
import IngredientExpandedPane from '../components/IngredientExpandedPane';
import RecipeComment from '../components/RecipeComment';
import NutritionInformation from '../components/NutritionInformation';


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
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/recipes/id/' + recipeId)
                const json = await response.json()
                
                setRecipeInfo(json);

                // Set initial servings and original servings only once
                if (originalServings === null) {
                    setOriginalServings(json.servings);
                    setServings(json.servings);
                }
                // Format and set instructions, ingredients, and nutrition
                setInstructions(formatInstructions(json.analyzedInstructions[0].steps));
                setIngredients(formatIngredients(json.extendedIngredients, json.servings));
                setOriginalIngredients(json.extendedIngredients);
                setNutrition(formatNutrition(json.nutrition.nutrients));
                
                fetchComments();
                fetchAverageRating(); 
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [recipeId, originalServings]);

    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/comments/' + recipeId);
            const json = await response.json();
            setComments(json);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/comments/average-rating/${recipeId}`);
            const json = await response.json();
            setAverageRating(json.averageRating);  
            return json.averageRating;
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    };
    

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
                <NutritionInformation nutrition={nutrition} />
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
                    averageRating={averageRating}
                />
                <RecipeInstructions instructions={instructions} />
                <RecipeComment recipeId={recipeId} fetchComments={fetchComments} fetchAverageRating={fetchAverageRating}/>
            </div>
        </div>
    );
}

export default Recipe;
