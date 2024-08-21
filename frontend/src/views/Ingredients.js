import React from 'react';
import { useEffect, useState } from "react";
import '../css/base.css'
import '../css/dropdown.css'
import IngredientsPane from '../components/IngredientsPane';
import IngredientSearch from '../components/IngredientSearch';


function Ingredients() {

    const [ingredientList, setIngredientList] = useState(() => {
        const localValue = localStorage.getItem("INGREDIENTS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    const [d_ingredientList, setDIngredientList] = useState(() => {
        const localValue = localStorage.getItem("DINGREDIENTS") // check if we also need to change this 
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    // is called everytime the page reloads/renders
    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList))
    }, [ingredientList]);

    // function to add ingredients to list
    function addIngredient(name) {
        const isFoundInThisList = ingredientList.some(ing => ing.title === name); // will be true if item is already in ingredients to exclude list 
        const isFoundInDList = d_ingredientList.some(ing => ing.title === name);   // will be true if item is in ingredients to include list 
        if(!isFoundInThisList && !isFoundInDList){
            console.log("ingredient added to list ")
        setIngredientList((currentIngredients) => {
            return [
                ...currentIngredients,
                {id: crypto.randomUUID(), title: name}
            ]
        })
    }
    else{
        console.log("ingredient already in one of the lists - not added again")
    }
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

                {/*  CONSIDER ADDING GENERATE RECIPE BUTTON HERE, so we only call api once */}

        </div>

    );
}

export default Ingredients;
