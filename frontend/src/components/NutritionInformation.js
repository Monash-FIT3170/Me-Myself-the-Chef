import React from "react";
import { useEffect, useState } from "react";

function NutritionInformation({ nutrition, scaledNutrition, servings }) {
    
    // Array of nutrients to display
    const nutrientsToDisplay = ['Calories', 'Fat', 'Saturated Fat', 'Carbohydrates', 'Sugar', 'Sodium'];

    return (
        <div className="row flex-fill" style={{ backgroundColor: '#458D59' }}>
            <div className="col-md-12">
                <div className="container-fluid mt-3 pt-3" style={{ backgroundColor: 'white', width: "80%" }}>
                    <div className="row text-center">
                        <h2 className="pb-2" style={{ color: 'black' }}>Nutrition</h2>
                        <p style={{ textAlign: 'left', fontWeight: '500', color: 'black', fontSize: '0.8em' }}>Original recipe is made for {servings} servings</p>
                    </div>

                    <div class="horiz_line_black"></div>
                    

                    <div className="row text-center">
                        <div className="col-md-12">
                            <table className="table table-sm">

                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col">Per serving</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>

                                <tbody>
                                    {nutrition.map((nutrientInfo, index) => {
                                        // Check if the current nutrient is one of the nutrients to display
                                        if (nutrientsToDisplay.includes(nutrientInfo[0])) {

                                            return <>  
                                                <tr>
                                                    <th style={{ textAlign: 'left' }} scope="row">{nutrientInfo[0]}</th>
                                                    <td>{`${nutrientInfo[1]} ${nutrientInfo[2]}`}</td>
                                                    <td>{`${scaledNutrition[index][1]} ${scaledNutrition[index][2]}`}</td>
                                                </tr>

                                            </>

                                        } else {
                                            return null; // Render nothing if the nutrient is not in the list
                                        }
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NutritionInformation;