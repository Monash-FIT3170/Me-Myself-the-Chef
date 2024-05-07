import React from 'react';
import Ingredient from './Ingredient';


function IngredientsPane({ ingredientList, deleteIngredient }) {

    return (
        <div className="col-md-3 white-text ingredients_pane">
            <div className="container">

                <div className="row pt-5 text-center">
                    <h2>Ingredients</h2>
                    
                    <div className="horiz_line"></div>
                </div>

                {/* <!-- Ingredients--> */}
                <div className="row">

                    {ingredientList.length === 0 && "No Ingredients"}
                    {ingredientList.map(ingredient => {
                    return (
                        <Ingredient
                        {...ingredient}
                        key={ingredient.id}
                        deleteIngredient={deleteIngredient}
                        />
                        )
                    })}

                </div>

            </div>
        </div>
    );
}

export default IngredientsPane;
