import { Ingredient } from "./Ingredient"

export function IngredientList({ ingredientList, deleteIngredient }) {
  return (
    <ul className="list">
      {ingredientList.length === 0 && "No Ingredients"}
      {ingredientList.map(ingredient => {
        return (
          <Ingredient
            {...ingredient}
            key={ingredient.id}
            deleteIngredient={deleteIngredient}
          />
        )
      })}
    </ul>
  )
}