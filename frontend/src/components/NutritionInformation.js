import React from "react";

function NutritionInformation({ nutrition, servings }) {
    // Array of nutrients to display
    const nutrientsToDisplay = ['Calories', 'Fat', 'Saturated Fat', 'Carbohydrates', 'Sugar', 'Sodium'];

    return (
        <div className="row flex-fill" style={{ backgroundColor: '#458D59' }}>
            <div className="col-md-12">
                <div className="container-fluid mt-3 pt-3" style={{ backgroundColor: 'white', width: "80%" }}>
                    <div className="row text-center">
                        <h2 style={{ color: 'black' }}>Nutrition</h2>
                        <p style={{ fontWeight: '500', color: 'black', fontSize: '0.8em' }}>Nutrition values listed are per serving</p>
                    </div>
                    

                    <div className="row text-center mt-3">
                        <div className="col-md-12">
                            <table className="table table-sm">
                                <tbody>

                                    {nutrition.map((nutrientInfo, index) => {
                                        // Check if the current nutrient is one of the nutrients to display
                                        if (nutrientsToDisplay.includes(nutrientInfo.split(': ')[0])) {

                                            // split by delimiter ':' to get nutrient and value
                                            let nutrientInfoSplit = nutrientInfo.split(':')
                                            let amount = nutrientInfoSplit[1].split(' ')
                                            amount[1] = amount[1]/parseInt(servings, 10)

                                            return <>  
                                                <tr style={{ textAlign: 'left' }}>
                                                    <th scope="row">{nutrientInfoSplit[0]}</th>
                                                    <td>{`${parseInt(amount[1], 10)} ${amount[2]}`}</td>
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