import React from 'react';
import { useEffect, useState } from "react";
import '../css/base.css'
import DisableIngredientsPane from '../components/DisableIngredientsPane'; // change to disable 
import DisabledIngredientSearch from '../components/DisabledIngredientSearch'; // change to disbale 


function Disable_Ingredients() {

    const [d_ingredientList, setDIngredientList] = useState(() => {
        const localValue = localStorage.getItem("DINGREDIENTS") // check if we also need to change this 
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("DINGREDIENTS", JSON.stringify(d_ingredientList))
    }, [d_ingredientList]);

    // function to add ingredients to list
    function addIngredient(title) {
        setDIngredientList((currentDIngredients) => {
            return [
                ...currentDIngredients,
                {id: crypto.randomUUID(), title: title}
            ]
        })
    }

    // function to delete ingredients from list
    function deleteIngredient(id) {
        setDIngredientList(currentDIngredients => {
            return currentDIngredients.filter(ingredient => ingredient.id !== id)
        })
    }

    return (

        <div className="row flex-fill">
                
                {/* <!-- Ingredients Pane--> */}
                <DisableIngredientsPane d_ingredientList={d_ingredientList} deleteIngredient={deleteIngredient}/>
                
                {/* <!-- Ingredient search section of page--> */}
                <DisabledIngredientSearch addIngredient={addIngredient}/>

                {/*  CONSIDER ADDING GENERATE RECIPE BUTTON HERE, so we only call api once */}

        </div>

    );
}

export default Disable_Ingredients;
