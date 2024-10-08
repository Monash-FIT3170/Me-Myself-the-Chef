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
        const localValue = localStorage.getItem("DINGREDIENTS") 
        if (localValue == null) return []

        return JSON.parse(localValue)
    });

    useEffect(() => {
        localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList));
        localStorage.setItem("DINGREDIENTS", JSON.stringify(d_ingredientList))
    }, [ingredientList, d_ingredientList]);

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
            console.log("result returned")
            if(isFoundInDList){
                return("inExclude");
            }
            else{
                return("inInclude");
            }
        }
    }

    // function to delete ingredients from list
    function deleteIngredient(id) {
        setIngredientList(currentIngredients => {
            return currentIngredients.filter(ingredient => ingredient.id !== id)
        })
    }

    // function to delete ingredients from disabled list 
    function deleteDisabledIngredient(id) {
        setDIngredientList(currentDIngredients => {
            return currentDIngredients.filter(ingredient => ingredient.id !== id)
        })
    }

        // function to add ingredients to list
    function addDisabledIngredient(name) {
        const isFoundInThisList = d_ingredientList.some(ing => ing.title === name); // will be true if item is already in ingredients to exclude list 
        const isFoundInIngList = ingredientList.some(ing => ing.title === name);   // will be true if item is in ingredients to include list 
            
            //console.log(d_ingredientList)
        if(!isFoundInThisList && !isFoundInIngList){
            console.log("ingredient added to list ")
            setDIngredientList((currentDIngredients) => {
            return [
                ...currentDIngredients,
                {id: crypto.randomUUID(), title: name}
            ]
        })
        }
        else{
            console.log("ingredient already in one of the lists - not added again")
            if(isFoundInThisList){
                return("inExclude");
            }
            else{
                return("inInclude");
            }
        }
    }

    return (

        <div className="row flex-fill">
                
                {/* <!-- Ingredients Pane--> */}
                <IngredientsPane ingredientList={ingredientList} deleteIngredient={deleteIngredient} disabledIngredients={d_ingredientList} deleteDisabledIngredient={deleteDisabledIngredient}/>

                {/* <!-- Ingredient search section of page--> */}
                <IngredientSearch addIngredient={addIngredient} addDisabledIngredient={addDisabledIngredient}/>

                {/*  CONSIDER ADDING GENERATE RECIPE BUTTON HERE, so we only call api once */}

        </div>

    );
}

export default Ingredients;
