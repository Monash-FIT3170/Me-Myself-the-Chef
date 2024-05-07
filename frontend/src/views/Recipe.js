import React from 'react';

const Recipe = () => {
    return (
        <div>
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row flex-fill">
                    <div class="col-md-3 white-text">
                        <IngredientsPane />
                        <NutritionPane />
                    </div>

                    <div class="col-md-9">
                        <div class="container">
                            <RecipeDetails />
                            <RecipeInstructions />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const IngredientsPane = () => {
    return (
        <div className="row half-pane pb-5" style={{ backgroundColor: '#5F926E' }}>
            <div className="col-md-12">
                <div className="container-fluid">
                    <div className="row pt-5 text-center">
                        <h2>Ingredients</h2>
                        <div className="horiz_line"></div>
                    </div>

                    <div className="row text-left">
                        <div className="col-md-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                <label className="form-check-label" htmlFor="flexCheckDefault1">
                                    4 long bread rolls
                                </label>
                            </div>
                            {/* Repeat this structure for each ingredient */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NutritionPane = () => {
    return (
        <div className="row half-pane pb-5" style={{ backgroundColor: '#3E6C4B' }}>
            <div className="col-md-12">
                <div className="container-fluid">
                    <div className="row pt-5 text-center">
                        <h2>Nutrition</h2>
                        <div className="horiz_line"></div>
                    </div>

                    <div className="row text-center">
                        <div className="col-md-12">
                            <p>Calories: 554cal (28%)</p>
                            {/* Include nutrition information here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecipeDetails = () => {
    return (
        <div className="pt-5 pb-5 white-text text-center" style={{ backgroundColor: '#3E6C4B' }}>
            {/* Top section for recipe details */}
            <div className="container">
                <div className="row">
                    {/* Left column for recipe details */}
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center ps-3">
                            {/* Wrapper for recipe title and button */}
                            {/* Recipe Title */}
                            <h1>Crispy Pork Belly Banh Mi</h1>
                            {/* Save button */}
                            <button type="button" className="btn btn-danger btn-sm">
                                <i className="bi bi-bookmark-heart"></i> Save
                            </button>
                        </div>
                        {/* Recipe Details */}
                        <p>Prep Time: 15 mins</p>
                        <p>Cook Time: 3 hrs</p>
                        <div className="col-md-6 mx-auto">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Number of Servings:</span>
                                <button className="input-group-text" id="btnGroupAddon" type="button">-</button>
                                <input type="text" className="form-control text-center" value="5" />
                                <button className="input-group-text" id="btnGroupAddon" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    {/* Right column for recipe image */}
                    <div className="col-md-6 text-end">
                        {/* Recipe Image */}
                        <img src="static/images/banh_mi.jpeg" alt="Recipe Image" className="img-fluid pe-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecipeInstructions = () => {
    return (
        <div className="row mt-4 text-left">
            <div className="col-md-12">
                {/* Recipe Instructions */}
                <div className="text-center">
                    <h2>Instructions</h2>
                </div>
                <ol style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '20px' }}>
                    <li>Dry skin overnight: Place pork belly on a plate. Pat skin dry with paper towels.
                        Leave uncovered in fridge overnight to dry out the skin. (If you don't have time,
                        pat the skin dry as best you can).</li>
                    <li>Preheat oven to 140°C/285°F (both fan and standard ovens).</li>
                    <li>Season flesh: Drizzle flesh side with 1 tsp oil. Sprinkle over 1/2 tsp salt, and all
                        the pepper and Chinese five spice. Rub all over the flesh, including on the sides.
                    </li>
                    <li>Foil boat: Place 2 pieces of foil on a work surface. Put the belly in middle of
                        foil, skin side up. Fold the sides in to enclose the belly, forming an open box,
                        pinching corners to seal tightly and make it as snug as possible. Place meat on a
                        tray.</li>
                    <li>Season skin: Pat skin dry with paper towels. Rub with 1/2 tsp oil then sprinkle
                        remaining 1/2 tsp salt evenly all over the skin surface, from edge to edge.</li>
                </ol>
            </div>
        </div>
    );
};


export default Recipe;
