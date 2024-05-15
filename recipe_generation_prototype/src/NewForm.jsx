import { useState } from "react"

export function NewForm({onSubmit}) {
   const [newIngredient, setNewIngredient] = useState("")

   function handleSubmit(e) {
		e.preventDefault()

      if (newIngredient === "") return
      
      onSubmit(newIngredient)

		setNewIngredient("")
	}

   return (
      <form onSubmit={handleSubmit} className="new-ingredient-form">
         <div className="form-row">
            <label htmlFor="ingredient">New Ingredient</label>
               <input 
                  value={newIngredient} 
                  onChange={e => setNewIngredient(e.target.value)} 
                  type="text" 
                  id="ingredient" 
               />
               {'       '}
               <button className="btn">Add</button>
         </div>
      </form>
   )
}