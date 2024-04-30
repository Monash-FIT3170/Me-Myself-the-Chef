import { Ingredient } from "./Ingredient"

export function IngredientList({ ingredientList, deleteIngredient }) {
  return (
    <>
      <h1 className="header">Ingredient List</h1>
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
    </>
  )
}