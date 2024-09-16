import React, { useState, useEffect } from 'react';
import AutoSearchBar from '../components/AutoSearchBar';
import { Link } from "react-router-dom";

function IngredientSearch({ addIngredient, addDisabledIngredient }) {
    const [warning, setWarning] = useState(false);

    const [includeIngredients, setIncludeIngredients] = useState(true);

    // Function to handle the user searching for an ingredient
    function onIngredientSearch(ingredient) {
        console.log(ingredient);
        const result = "";
        if(includeIngredients){
            const result = addIngredient(ingredient);
        }
        else{
            const result = addDisabledIngredient(ingredient);
        }

        if (result === 'cannotAdd') {
            setWarning(true);
        } else {
            setWarning(false);
        }
    }

    // Automatically hide the warning message after a certain time (e.g., 3 seconds)
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                setWarning(false); // Hide the warning after 3 seconds
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or warning changes
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

    // function to change which list ingredients are being added to 
    function changeIngredientsToAdd(){
        setIncludeIngredients(!includeIngredients);
    }

    return (
        <div className="col-md-9 text-center ingredients_search">
            <div className="container">
                <div className="row search_section">
                    <h1 className="heading">Select your Ingredients</h1>
                </div>

                <div className="row mt-4">
                    <p className="mb-0">{includeIngredients ? 'Type what ingredients you have here' : 'Type what ingredients you don’t have here'}</p>
                    <p>When you’re done, generate your recipes!</p>
                </div>

                {/* <!-- Search bar--> */}
                <div className="row mt-3">
                    <div className="search-bar-container">
                        <AutoSearchBar includeIngredients = {includeIngredients} onIngredientSearch={onIngredientSearch} />
                        <button className="change-button-2" onClick={changeIngredientsToAdd}>{includeIngredients ? 'Add ingredients to disable' : 'Add ingredients to include'}</button>
                    </div>
                    <div className="component">
                        {warningMessage()}
                    </div>
                </div>
            </div>

            {/* <!-- Generate recipe button --> */}
            <Link className="react_link" to="/recipe_recommendation">
                <button type="button" className="btn btn-light btn-lg" id="gen-button">Generate Recipes</button>
            </Link>
        </div>
    );
}

export default IngredientSearch;