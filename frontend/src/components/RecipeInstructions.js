import React from 'react';

function RecipeInstructions({ instructions }) {
   return (
       <div className="row mt-5 text-left">
           <div className="col-md-12">
               {/* Recipe Instructions */}
               <div className="text-center">
                   <h2>Instructions</h2>
               </div>
               <ol style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '20px' }}>
                   {instructions.map((instruction, index) => (
                       <li key={index}>{instruction}</li>
                   ))}
               </ol>
           </div>
       </div>
   );
}

export default RecipeInstructions;