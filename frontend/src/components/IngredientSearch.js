import React from 'react';


function IngredientSearch() {
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
                        <div class="row">

                            <div class="search-bar-container">

                                <p><i>Placeholder search bar</i></p>

                                {/* <!-- TODO: autosearch bar must be done with React--> */}

                                {/* <!-- <ReactSearchAutocomplete items={suggestions} /> --> */}

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
