import React from 'react';
import IngredientRecipe from './IngredientRecipe';
import { Link } from "react-router-dom";

//this is the ingredients pane that appears when recipes have been generated 
function IngredientsRecipePane({ ingredientList, disabledIngredients }) {

    return (
        <div className="col-md-3 white-text ingredients_pane">
            <div className="container">

                <div className="row pt-5 text-center">
                    <h2>Ingredients</h2>
                    
                    <div className="horiz_line"></div>
                </div>

                {/* <!-- Ingredients--> */}
                <div className="row">

                    {!ingredientList && <div style={{textAlign: "center"}}>No Ingredients</div>}
                    {ingredientList && ingredientList.map(ingredient => {
                    return (
                        <IngredientRecipe
                        {...ingredient}
                        key={ingredient.id}
                        />
                        )
                    })}

                </div>
                <div className="row pt-5 text-center">
                    <h5>Disabled Ingredients</h5>
                    
                    <div className="horiz_line"></div>
                </div>
                <div className="row">
                    <div>
                        {!disabledIngredients && <div style={{textAlign: "center"}}>No Ingredients</div>}
                            {disabledIngredients && disabledIngredients.map(ingredient => {
                            return (
                                <IngredientRecipe
                                {...ingredient}
                                key={ingredient.id}
                                />
                            )
                        })}
                    </div>
                </div>
                
                <Link className="react_link" to="/ingredients">
                    <button type="button" className="btn btn-light btn-lg" id="change-button">Change Ingredients</button>
                </Link>

            </div>
        </div>
    );
}

export default IngredientsRecipePane;