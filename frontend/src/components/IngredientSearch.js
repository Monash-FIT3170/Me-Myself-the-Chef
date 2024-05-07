import React from 'react';
import AutoSearchBar from '../components/AutoSearchBar';


function IngredientSearch() {

    function onSearchPlaceholder(item) {
        console.log(item)
    }

    return (
        <div class="col-md-9 text-center ingredients_search">
                    
            <div class="container">
                
                <div class="row search_section">
                    <h1 class="heading">Make your ingredients</h1>
                </div>

                <div class="row mt-4">
                    <p>Type what ingredients you have here</p>
                    <p>When you’re done, generate your recipes!</p>
                </div>

                {/* <!-- Search bar--> */}
                <div class="row mt-3">

                    <div class="search-bar-container">

                        <AutoSearchBar onSearchSelected={onSearchPlaceholder}/>

                        {/* <!--
                            See:
                            - Tutorial: https://www.dhiwise.com/post/how-to-build-react-search-bar-with-suggestions
                            - Examples: https://www.npmjs.com/package/react-search-autocomplete

                        --> */}

                    </div>
                </div>
            </div>

            {/* <!-- Generate recipe button --> */}
            <button type="button" class="btn btn-light btn-lg" id="gen-button">Generate recipes</button>
            
            
        </div>
    );
}

export default IngredientSearch;
