import React, { useContext, useEffect, useState  } from 'react';
import AutoSearchBar from '../components/AutoSearchBar';
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import { PreferenceContext } from '../context/PreferenceContext';

function IngredientSearch({ addIngredient, addDisabledIngredient }) {
    const [warning, setWarning] = useState(false);

    const [warningList, setWarningList] = useState('');

    const [includeIngredients, setIncludeIngredients] = useState(true);

    const [result, setResult] = useState('');

    // Function to handle the user searching for an ingredient
    function onIngredientSearch(ingredient) {
        console.log(ingredient);
        if(includeIngredients){
            setResult(addIngredient(ingredient));
        }
        else{
            setResult(addDisabledIngredient(ingredient));
        }
    }

    // once result has been set, check if the item repeated in either list --> triggers warning message if required 
    useEffect(() => {
        if (result) {
            if (result === 'inInclude') {
                setWarningList('include')
                setWarning(true);
            } else if (result == 'inExclude') {
                setWarningList('exclude')
                setWarning(true);
            }
            else {
                setWarning(false);
            }
        }
    }, [result]);

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
                    {warningList === 'exclude' ? 
                    <span dangerouslySetInnerHTML={{ __html: 'Cannot add - ingredient already in <strong>exclude</strong>' }}></span> :
                    <span dangerouslySetInnerHTML={{ __html: 'Cannot add - ingredient already in <strong>include</strong>' }}></span> }
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
                        <Dropdown/>
                        <button className="change-button-2" onClick={changeIngredientsToAdd}>{includeIngredients ? 'Add ingredients to disable' : 'Add ingredients to include'}</button>
                        <Link className="react_link" to="/recipe_recommendation">
                            <button type="button" className="btn btn-light btn-lg" id="gen-button">Generate Recipes</button>
                        </Link>
                    </div>
                    <div className="warning">
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