import React, {useContext} from 'react';
import {useState, useEffect} from "react";
import ReactStars from 'react-rating-stars-component';
import {AuthContext} from "../context/AuthContext";

// Functional component for displaying recipe details
function RecipeDetails({
						   id,
						   title,
						   image,
						   servings,
						   setServings,
						   prepTime,
						   cookTime,
						   adjustIngredients,
						   averageRating
					   }) {

	// Function to handle increasing servings
	const handleIncreaseServings = () => {
		const newServings = servings + 1;
		setServings(newServings);
		adjustIngredients(newServings);
	};

	// Function to handle decreasing servings
	const handleDecreaseServings = () => {
		// Ensure servings don't go below 1
		if (servings > 1) {
			const newServings = servings - 1;
			setServings(newServings);
			adjustIngredients(newServings);
		}
	};

	const {isLoggedIn} = useContext(AuthContext);
	// Whether the recipe is in the user's saved recipes
	const [isSaved, setSaved] = useState(null);
	const [savedRecipes, setSavedRecipes] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/auth/getSavedRecipes", {
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
		const response = await fetch('http://localhost:8080/api/auth/updateSavedRecipes', {
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
		const response = await fetch('http://localhost:8080/api/auth/updateSavedRecipes', {
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

	// Render recipe details UI
	return (
		<div className="row pt-5 pb-5 ps-4 white-text text-left" style={{backgroundColor: '#3E6C4B'}}>
			<div className="container">
				<div className="row">

					<div className="col-md-7" style={{paddingLeft: "5%"}}>
						<div className="row">
							<div className="col-md-8">
								<h1>{title}</h1>
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

						<br></br>

						<div className='row'>
							<div className="col-md-6">
								<p>Prep Time: {prepTime > 0 ? prepTime + " mins" : "N/A"}</p>
								<p>Cook Time: {cookTime} mins</p>
								<div className="input-group input-group-sm">
									<span className="input-group-text">Number of Servings:</span>
									<button className="input-group-text" type="button"
											onClick={handleDecreaseServings}>-
									</button>
									<input type="text" className="form-control text-center" value={servings} readOnly/>
									<button className="input-group-text" type="button"
											onClick={handleIncreaseServings}>+
									</button>
								</div>
								<div className="mt-3 d-flex justify-content-center">
									{averageRating !== 0 && !isNaN(averageRating) ? (
										<ReactStars
											key={averageRating}
											count={5}
											size={24}
											activeColor="#ffd700"
											value={averageRating}
											edit={false}
										/>
									) : (
										<p>No Ratings Yet</p> // Placeholder while loading average rating or in case of error
									)}
								</div>
							</div>
						</div>

					</div>

					<div className="col-md-2 mt-2"></div>

					<div className="col-md-3 text-end">
						<img src={image} alt="Recipe" className="img-fluid"
							 style={{maxWidth: "100%", height: "auto", border: "5px solid white"}}/>
					</div>

				</div>
			</div>
		</div>
	);
}

export default RecipeDetails;
