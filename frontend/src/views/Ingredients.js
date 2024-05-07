import React from 'react';
import '../css/base.css'
import IngredientsPane from '../components/IngredientsPane';


function Ingredients() {

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


    return (
        
        <>
            <IngredientsPane ingredientList={tempIngredients} deleteIngredient={deleteIngredient}/>
        </>

    );
}

export default Ingredients;
