import React from 'react';
import '../css/base.css'
import IngredientsPane from '../components/IngredientsPane';
import IngredientSearch from '../components/IngredientSearch';


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

        <div class="row flex-fill">
                
                {/* <!-- Ingredients Pane--> */}
                <IngredientsPane ingredientList={tempIngredients} deleteIngredient={deleteIngredient}/>
                
                {/* <!-- Ingredient search section of page--> */}
                <IngredientSearch />

        </div>

    );
}

export default Ingredients;
