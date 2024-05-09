import React from 'react';
import { useEffect, useState } from "react";
import '../css/base.css'
import IngredientsPane from '../components/IngredientsPane';
import IngredientSearch from '../components/IngredientSearch';


function Ingredients() {

    const [ingredientList, setIngredientList] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    const tempIngredients = [
        {
            id: 1,
            name: "Beef",
        },
        {
            id: 2,
            name: "Tomatoes",
        }

    ]

    function deleteIngredient(id) {

    }

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList))
    }, [ingredientList]);

    // function to add ingredients to list
    function addIngredient(title) {
        setIngredientList((currentIngredients) => {
            return [
                ...currentIngredients,
                {id: crypto.randomUUID(), title: title}
            ]
        })
    }

    // function to delete ingredients from list
    function deleteIngredient(id) {
        setIngredientList(currentIngredients => {
            return currentIngredients.filter(ingredient => ingredient.id !== id)
        })
    }

    return (

        <div className="row flex-fill">
                
                {/* <!-- Ingredients Pane--> */}
                <IngredientsPane ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
                
                {/* <!-- Ingredient search section of page--> */}
                <IngredientSearch addIngredient={addIngredient}/>

        </div>

    );
}

export default Ingredients;
