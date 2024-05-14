import React from 'react';
import '../css/base.css'
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, key }) {
   return (
       <div className="col-12 col-lg-6">
           <div className="card mb-3" style={{ maxWidth: '540px' }}>
           <Link to="/recipe" className="card-link stretched-link"></Link>
               <div className="row g-0">
                   <div className="col-md-8">
                       <div className="card-body">

                            {/* recipe title */}
                           <h5 className="card-title">{recipe.title}
                               <button type="button" className="btn btn-link text-danger"><i className="fa fa-heart" style={{ fontSize: '24px' }}></i></button>
                           </h5>
                           
                           <p className="card-text">You have all the ingredients</p>
                       </div>
                   </div>
                   <div className="col-md-4">
                       <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
                   </div>
               </div>
           </div>
       </div>
   );
}

export default RecipeCard;
