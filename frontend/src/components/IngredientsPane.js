import React from 'react';
import Ingredient from './Ingredient';
import { Link } from "react-router-dom";

// this is the ingredients pane that appears before recipes have been generated 
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

                    {ingredientList.length === 0 && <div style={{textAlign: "center"}}>No Ingredients</div>}
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
                <Link className="react_link" to="/disable_Ingredients">
                    <button type="button" className="btn btn-light btn-lg" id="change-button" style={{ fontSize: '15px' }}>Add Ingredients to Disable</button>
                </Link>
            </div>
        </div>
    );
}

export default IngredientsPane;
