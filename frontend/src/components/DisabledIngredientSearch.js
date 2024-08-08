import React from 'react';
import AutoSearchBar from '../components/AutoSearchBar';
import { Link } from "react-router-dom";


function DisabledIngredientSearch({addIngredient}) {

    // function to handle the user searching an ingredient
    function onIngredientSearch(ingredient) {
        console.log(ingredient);
        addIngredient(ingredient);
    }

    return (
        <div className="col-md-9 text-center ingredients_search">
                    
            <div className="container">
                
                <div className="row search_section">
                    <h1 className="heading">Select your Ingredients to Disable</h1>
                </div>

                <div className="row mt-4">
                    <p>Type what ingredients you cannot use here</p>
                </div>

                {/* <!-- Search bar--> */}
                <div className="row mt-3">

                    <div className="search-bar-container">

                        <AutoSearchBar onIngredientSearch={onIngredientSearch}/> 

                        {/* <!-- FIX THE ABOVE SO THE ITEM GOES INTO THE RIGHT LIST 
                            See:
                            - Tutorial: https://www.dhiwise.com/post/how-to-build-react-search-bar-with-suggestions
                            - Examples: https://www.npmjs.com/package/react-search-autocomplete

                        --> */}

                    </div>
                </div>
            </div>

            {/* <!-- Generate recipe button --> */}
            <Link className="react_link" to="/ingredients">
                <button type="button" className="btn btn-light btn-lg" id="gen-button">Generate Recipes</button>
            </Link>

            
            
        </div>
    );
}

export default DisabledIngredientSearch;
