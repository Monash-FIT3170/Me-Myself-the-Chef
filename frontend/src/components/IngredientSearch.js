import React, { useContext, useEffect, useState } from 'react';
import AutoSearchBar from '../components/AutoSearchBar';
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import { PreferenceContext } from '../context/PreferenceContext';

function IngredientSearch({addIngredient}) {
    const { updatePreferences } = useContext(PreferenceContext);
    const [warning, setWarning] = useState(false);

    // function to handle the user searching an ingredient
    function onIngredientSearch(ingredient) {
        console.log(ingredient);
        const result = addIngredient(ingredient);
        console.log("result: " + result);

        // check if warning needs to be displayed
        if (result === 'cannotAdd') {
            setWarning(true);
        } else {
            setWarning(false);
        }
    }

    // Automatically hide the warning message after a certain time
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                setWarning(false); // Hide the warning after 3 seconds
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [warning]);

    // Function to render the warning message
    function warningMessage() {
        if (warning) {
            return (
                <div className={`alert alert-danger alert-dismissible fade show custom-alert`} role="alert">
                    <span dangerouslySetInnerHTML={{ __html: 'Cannot add ingredients already in <strong>exclude</strong>' }}></span>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setWarning(false)}></button>
                </div>
            );
        }
        return null;
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
                    <div className="warning">
                        {warningMessage()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientSearch;