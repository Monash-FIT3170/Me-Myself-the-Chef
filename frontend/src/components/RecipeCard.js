import React from 'react';
import '../css/base.css'
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
    // defining the dynamic text to display in the card
    let text = "";

    // if (recipe.missedIngredientCount === 0) {
    //     text = "You have all the ingredients."
    // } else {
    //     text = `You are missing ${recipe.missedIngredientCount} additional ingredients: `
    //     for (let i = 0; i < recipe.missedIngredients.length; i++) {
    //         text = text + `${recipe.missedIngredients[i].name}`;
    //         if (i !== (recipe.missedIngredientCount - 1)) {
    //             text = text + ", ";
    //         }
    //     }
    //     text = text + ".";
    // }

    return (
        <div className="col-12 col-lg-6">
            <Link className="react_link" to="/recipe" state={recipe.id}>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <p className="card-text">{text}</p>
                        
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
            </div>
            </Link>
        </div>
    );
}

export default RecipeCard;