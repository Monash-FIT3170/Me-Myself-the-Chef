import React from 'react';
import '../css/base.css'
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
    // defining the dynamic text to display in the card
    let text = "";

    const toggleFavourite = () => {
        console.log("hello world")
        // const id = event.target.id
        // let checked = event.target.checked
        // const response = await fetch('http://localhost:8080/api/auth/getSavedRecipes', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-access-token': localStorage.getItem('token')
        //     }
        // });
        // const data = await response.json();

        // const updatedObj = [...data, recipe.id]

        // const response2 = await fetch('http://localhost:8080/api/auth/updateSavedRecipes', {
        //     method: 'POST',
        //     body: {saved_recipes: updatedObj},
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-access-token': localStorage.getItem('token')
        //     }
        // });
        // console.log(response2)
    }
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
                                <button
                                type="button"
                                onClick={(e) => {

                                }}
                                className="btn btn-danger btn-sm"
                            >
                                Save
                            </button>
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