import { useEffect, useState } from "react"
import { IngredientList } from "./IngredientList"
import { NewForm } from "./NewForm"

export default function App() {
	const [ingredientList, setIngredientList] = useState(() => {
		const localValue = localStorage.getItem("INGREDIENTS")
		if (localValue == null) return []

		return JSON.parse(localValue)
	})

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

	return (
		<>
		<NewForm onSubmit={addIngredient}/>
		<h1 className="header">Ingredient List</h1>
		<IngredientList ingredientList={ingredientList} deleteIngredient={deleteIngredient}/>
		</>
	)
}