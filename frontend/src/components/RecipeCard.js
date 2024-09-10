import React, {useContext} from 'react';
import {useState, useEffect} from "react";
import '../css/base.css'
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function RecipeCard({ recipe }) {
	let id = recipe.id
    // defining the dynamic text to display in the card
    let text = "";

    const {isLoggedIn} = useContext(AuthContext);
	// Whether the recipe is in the user's saved recipes
	const [isSaved, setSaved] = useState(null);
	const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getSavedRecipes`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': localStorage.getItem('token')
					},
				})
				const json = await response.json()
				setSaved(json.includes(id))
				setSavedRecipes(json)
			} catch (error) {
				console.error(error);
			}
		};
		if (isLoggedIn) {
			fetchData();
		}

	}, []);

    const saveRecipe = async (event) => {
		if (savedRecipes.includes(id)) {
			return  // As the user has already saved this recipe
		}
		// Add the new recipe to the list of saved recipes
		const updatedObj = [...savedRecipes, id]
		// Send updated list back to backend
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateSavedRecipes`, {
			method: 'POST',
			body: JSON.stringify({saved_recipes: updatedObj}),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
			}
		});
		if (response.status === 200) {
			setSaved(true);
			setSavedRecipes(updatedObj)
		}
	}

	const unsaveRecipe = async (event) => {
		if (!savedRecipes.includes(id)) {
			return;  // As the user never saved this recipe
		}
		// Remove the ID from the array
		const updatedObj = savedRecipes.filter(recipeId => recipeId !== id);
		// Send updated list back to backend
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateSavedRecipes`, {
			method: 'POST',
			body: JSON.stringify({saved_recipes: updatedObj}),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
			}
		});
		if (response.status === 200) {
			setSaved(false);
			setSavedRecipes(updatedObj)
		}
	}

    return (
        <div className="col-12 col-lg-6">
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
							<Link className="react_link" to="/recipe" state={recipe.id}>
                                <h5 className="card-title recipe_card_text_limit">{recipe.title}</h5>
                                {/* <p className="card-text">{text}</p> */}
								</Link>
                                {isLoggedIn && !isSaved && <button
									type="button"
									onClick={(e) => saveRecipe(e)}
									className="btn btn-primary btn-sm me-2">
									Save
								</button>}
								{isLoggedIn && isSaved && <button
									type="button"
									onClick={(e) => unsaveRecipe(e)}
									className="btn btn-danger btn-sm">
									Remove
								</button>}
                            </div>
                        </div>
                        <div className="col-md-4">
						<Link className="react_link" to="/recipe" state={recipe.id}>
                            <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
                        </Link>
						</div>
                    </div>
            </div>
        </div>
    );
}

export default RecipeCard;