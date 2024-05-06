import React from 'react';
import '../css/base.css'

function RecipeCard({ recipeNumber }) {
    return (
        <div className="col-12 col-lg-6">
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <a href="#" className="card-link stretched-link"></a>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Recipe {recipeNumber}
                                <button type="button" className="btn btn-link text-danger"><i className="fa fa-heart" style={{ fontSize: '24px' }}></i></button>
                            </h5>
                            <p className="card-text">You have all the ingredients</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="/static/images/pancake.jpg" className="img-fluid rounded-start" alt="..." />
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecipeRecommendation() {
    return (
        <>
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row flex-fill">
                    {/* Ingredients Pane */}
                    <div className="col-md-3 white-text" style={{backgroundColor: '#458D59'}}>
                        <div className="container">
                            <div className="row pt-5 text-center">
                                <h2>Ingredients</h2>
                                <div className="horiz_line"></div>
                            </div>
                            {/* Ingredients */}
                            <div className="row">
                                <div className="row">
                                    <div className="col text-center">
                                        <p>Beef</p>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="image" id="delBeef" src="/static/images/bin.png" height="24px"/>
                                    </div>
                                </div>
                                {/* Other ingredients... */}
                            </div>
                        </div>
                    </div>

                    {/* Display Recipe Pane */}
                    <div className="col-md-9" style={{backgroundColor: '#ECECEC'}}>
                        <div className="row pt-5 text-center">
                            <h2>Recipe Recommendations</h2>
                            <h5> You have 8 recommendations</h5>
                            <div className="horiz_line" style={{backgroundColor: '#000000'}}></div>
                        </div>
                        {/* Display recipe generation result */}
                        <div className="container">
                            <div className="row">
                                {[...Array(8).keys()].map(i => <RecipeCard key={i + 1} recipeNumber={i + 1}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default RecipeRecommendation;
