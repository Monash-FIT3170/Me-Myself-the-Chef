import React from 'react';

const Recipe = () => {
    // Placeholder recipe data
    const recipeData = {
        title: "Crispy Pork Belly Banh Mi",
        image: "static/images/banh_mi.jpeg",
        servings: 5,
        prepTime: "15 mins",
        cookTime: "3 hrs",
        ingredients: [
            "4 long bread rolls",
            // Add more ingredients here
        ],
        nutrition: {
            calories: "554cal",
            percentDailyValue: "28%"
            // Add more nutrition information here
        },
        instructions: [
            "Dry skin overnight: Place pork belly on a plate...",
            // Add more instructions here
        ]
    };

    return (
        <div className="row flex-fill">
            <div className="col-md-3 d-flex flex-column white-text">
                <IngredientsPane ingredients={recipeData.ingredients} />
                <NutritionPane nutrition={recipeData.nutrition} />
            </div>

            <div className="col-md-9 d-flex flex-column">
                <RecipeDetails
                    title={recipeData.title}
                    image={recipeData.image}
                    servings={recipeData.servings}
                    prepTime={recipeData.prepTime}
                    cookTime={recipeData.cookTime}
                />
                <RecipeInstructions instructions={recipeData.instructions} />
            </div>
        </div>
    );
};

const IngredientsPane = ({ ingredients }) => {
    return (
        <div className="row pb-5 flex-fill" style={{ backgroundColor: '#5F926E' }}>
            <div className="col-md-12">
                <div className="container-fluid">
                    <div className="row pt-5 text-center">
                        <h2>Ingredients</h2>
                        <div className="horiz_line"></div>
                    </div>

                    <div className="row text-left">
                        <div className="col-md-12">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id={`ingredient-${index}`} />
                                    <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                                        {ingredient}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NutritionPane = ({ nutrition }) => {
    return (
        <div className="row pb-5 flex-fill" style={{ backgroundColor: '#3E6C4B' }}>
            <div className="col-md-12">
                <div className="container-fluid">
                    <div className="row pt-5 text-center">
                        <h2>Nutrition</h2>
                        <div className="horiz_line"></div>
                    </div>

                    <div className="row text-center">
                        <div className="col-md-12">
                            <p>Calories: {nutrition.calories} ({nutrition.percentDailyValue})</p>
                            {/* Include other nutrition information here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecipeDetails = ({ title, image, servings, prepTime, cookTime }) => {
    return (
        <div className="row pt-5 pb-5 white-text text-center" style={{ backgroundColor: '#3E6C4B' }}>
            {/* Top section for recipe details */}
            <div className="container">
                <div className="row">
                    {/* Left column for recipe details */}
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between align-items-center ps-3">
                            {/* Wrapper for recipe title and button */}
                            {/* Recipe Title */}
                            <h1>{title}</h1>
                            {/* Save button */}
                            <button type="button" className="btn btn-danger btn-sm">
                                <i className="bi bi-bookmark-heart"></i> Save
                            </button>
                        </div>
                        {/* Recipe Details */}
                        <p>Prep Time: {prepTime}</p>
                        <p>Cook Time: {cookTime}</p>
                        <div className="col-md-6 mx-auto">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Number of Servings:</span>
                                <button className="input-group-text" id="btnGroupAddon" type="button">-</button>
                                <input type="text" className="form-control text-center" value={servings} />
                                <button className="input-group-text" id="btnGroupAddon" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    {/* Right column for recipe image */}
                    <div className="col-md-6 text-end">
                        {/* Recipe Image */}
                        <img src={image} alt="Recipe Image" className="img-fluid pe-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecipeInstructions = ({ instructions }) => {
    return (
        <div className="row mt-4 text-left">
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
};


export default Recipe;
