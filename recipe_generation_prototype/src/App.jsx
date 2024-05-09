import { useEffect, useState } from "react";
import React from "react";
import { IngredientList } from "./IngredientList";
import { NewForm } from "./NewForm";
import { RecipeList } from "./RecipeList";
import { ExpandedRecipe } from "./ExpandedRecipe";

export default function App() {
	const [ingredientList, setIngredientList] = useState(() => {
		const localValue = localStorage.getItem("INGREDIENTS")
		if (localValue == null) return []

		return JSON.parse(localValue)
	})

	// setting when to display home page
	const [displayHomePage, setHomePage] = useState(true);	// default value true
 
	// setting when to display recipe list
	const [displayRecipe, setDisplayRecipe] = useState();

	// setting recipe id to use in expanded view
	const [expandedRecipeId, setExpandedRecipeId] = useState();

	// const [recipeList, setRecipeList] = useState([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=bannana,+flour,+sugar&number=2`)
	// 			setRecipeList(response.data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
		
	// 	fetchData();
	// }, []);

	useEffect(() => {
		localStorage.setItem("INGREDIENTS", JSON.stringify(ingredientList))
	}, [ingredientList])

	function addIngredient(title) {
		setIngredientList((currentIngredients) => {
			return [
				...currentIngredients, 
				{id: crypto.randomUUID(), title: title}
			]
		})
	}

	function deleteIngredient(id) {
		setIngredientList(currentIngredients => {
			return currentIngredients.filter(ingredient => ingredient.id !== id)
		})
	}

	function generateRecipes() {
		//debugger;
		setDisplayRecipe(true);

		// if (displayRecipe) {
		// 	setRefreshPage([]);
		// } else {
		// 	setDisplayRecipe(true);
		// }
	}

	function resetRecipes() {
		setDisplayRecipe(false);
	}

	function returnToHome() {
		setHomePage(true);
	}

	if (displayHomePage) {
		// display home page
		return (
			<>
			{displayHomePage == true} 
			<NewForm onSubmit={addIngredient}/>
			<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
			<button onClick={() => generateRecipes()} className="btn">Generate Recipes</button>
			<button onClick={() => resetRecipes()} className="btn">Reset Recipes</button>
			{displayRecipe == true &&
				<RecipeList ingredientList={ingredientList} setHomePage={setHomePage} setExpandedRecipeId={setExpandedRecipeId}/>
			}
		</>
		)
	} else {
		// display expanded recipe page
		console.log("displaying expanded recipe page");
		console.log(expandedRecipeId);
		return (
			<ExpandedRecipe expandedRecipeId={expandedRecipeId} returnToHome={returnToHome}/>
		)
	}

	// if (displayRecipe) {
	// 	return (
	// 		<>
	// 			<NewForm onSubmit={addIngredient}/>
	// 			<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
	// 			<button onClick={() => generateRecipe()} className="btn">Generate Recipes</button>
	// 		</>
	// 	)
	// } return (
	// 	<>
	// 	<NewForm onSubmit={addIngredient}/>
	// 	<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
	// 	<button onClick={() => generateRecipe()} className="btn">Generate Recipes</button>
	// 	<RecipeList ingredientList={ingredientList}/>
	// 	</>
	// )
}