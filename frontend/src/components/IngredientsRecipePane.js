import React from 'react';
import IngredientRecipe from './IngredientRecipe';
import { Link } from "react-router-dom";

//this is the ingredients pane that appears when recipes have been generated 
function IngredientsRecipePane({ ingredientList }) {

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
                        <IngredientRecipe
                        {...ingredient}
                        key={ingredient.id}
                        />
                        )
                    })}

                </div>
                
                <Link className="react_link" to="/ingredients">
                    <button type="button" className="btn btn-light btn-lg" id="change-button">Change Ingredients</button>
                </Link>

            </div>
        </div>
    );
}

export default IngredientsRecipePane;