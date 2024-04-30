import { useEffect, useState } from "react"
import { IngredientList } from "./IngredientList"
import { NewForm } from "./NewForm"
import axios from "axios"
import { RecipeList } from "./RecipeList"
const API_KEY = "09861c68c07140d8a96e353c8d4f86cc"

export default function App() {
	const [ingredientList, setIngredientList] = useState(() => {
		const localValue = localStorage.getItem("INGREDIENTS")
		if (localValue == null) return []

		return JSON.parse(localValue)
	})

	const [displayRecipe, setDisplayRecipe] = useState(false);

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

	function generateRecipe() {
		setDisplayRecipe(true);
	}

	if (displayRecipe) {
		return (
			<>
				<NewForm onSubmit={addIngredient}/>
				<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
				<button onClick={() => generateRecipe()} className="btn">Generate Recipes</button>
			</>
		)
	} return (
		<>
		<NewForm onSubmit={addIngredient}/>
		<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
		<button className="btn">Generate Recipes</button>
		<RecipeList ingredientList={ingredientList}/>
		</>
	)
}