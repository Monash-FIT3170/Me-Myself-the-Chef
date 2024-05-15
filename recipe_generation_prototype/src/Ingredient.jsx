export function Ingredient({ id, title, deleteIngredient }) {
   return (
     <li>
       <label>
         {title}
       </label>
       {
        '                  '
       }
       <button onClick={() => deleteIngredient(id)} className="btn" >
         Delete
       </button>
     </li>
   )
 }