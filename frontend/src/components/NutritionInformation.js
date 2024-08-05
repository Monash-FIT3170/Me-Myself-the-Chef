import React from "react";

function NutritionInformation({ nutrition }) {
    // Array of nutrients to display
    const nutrientsToDisplay = ['Calories', 'Fat', 'Saturated Fat', 'Carbohydrates', 'Sugar'];

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
                            {nutrition.map((nutrientInfo, index) => {
                                // Check if the current nutrient is one of the nutrients to display
                                if (nutrientsToDisplay.includes(nutrientInfo.split(':')[0])) {
                                    return <p key={index}>{nutrientInfo}</p>;
                                } else {
                                    return null; // Render nothing if the nutrient is not in the list
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NutritionInformation;