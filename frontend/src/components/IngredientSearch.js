import React, { useContext } from 'react';
import AutoSearchBar from '../components/AutoSearchBar';
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import { PreferenceContext } from '../context/PreferenceContext';

function IngredientSearch({addIngredient}) {
    const { updatePreferences } = useContext(PreferenceContext);

    // function to handle the user searching an ingredient
    function onIngredientSearch(ingredient) {
        console.log(ingredient);
        addIngredient(ingredient);
    }

    return (
        <div className="col-md-9 text-center ingredients_search">
                    
            <div className="container">
                
                <div className="row search_section">
                    <h1 className="heading">Select your Ingredients</h1>
                </div>

                <div className="row mt-4">
                    <p className="mb-0">Type what ingredients you have here</p>
                    <p>When you’re done, generate your recipes!</p>
                </div>

                {/* <!-- Search bar--> */}
                <div className="row mt-3">

                    <div className="search-bar-container">
                        {/* <!-- Search bar --> */}
                        <AutoSearchBar onIngredientSearch={onIngredientSearch}/>

                        {/* <!--
                            See:
                            - Tutorial: https://www.dhiwise.com/post/how-to-build-react-search-bar-with-suggestions
                            - Examples: https://www.npmjs.com/package/react-search-autocomplete

                        --> */}

                        <Dropdown />

                        {/* <!-- Generate recipe button --> */}
                        <Link className="react_link generate-recipe-button" to="/recipe_recommendation">
                            <button type="button" className="btn btn-light btn-lg" id="gen-button" onClick={updatePreferences}>Generate Recipes</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientSearch;