import React from "react";


function getFormInfo(id) {
    /*Keep the order/ids the same as the baseNutritionList in NurtitionPreference*/
    const NutritionFormInfo = [
        {min_limit: 0, max_limit: 5000, unit: "kJ", step: 100 },
        {min_limit: 0, max_limit: 100, unit: "g", step: 5 },
        {min_limit: 0, max_limit: 100, unit: "g", step: 5 },
        {min_limit: 0, max_limit: 100, unit: "g", step: 5 },
        {min_limit: 0, max_limit: 100, unit: "g", step: 5 },
        {min_limit: 0, max_limit: 100, unit: "g", step: 5 },
        {min_limit: 0, max_limit: 1000, unit: "mg", step: 50 },
    ]

    if (id < NutritionFormInfo.length) {
        return NutritionFormInfo[id]
    }
    else {
        return {min_limit: 0, max_limit: 100, unit: "?", step: 1 }
    }
}

function NutritionPane({ nutritionList, updateNutrition }) {

    // ----------------------------
    // TODO: 
    // - ADD GRID FORMATTING FOR NUTRIENTS
    // - ADD INPUT VALIDATION
    // - SPECIFY CORRECT UNITS FOR EACH NUTRIENT
    // ----------------------------

    return (
        <div className="row" style={{ paddingBottom: "80px" }}>
            <div class="row text-left" style={{ padding: "10px 0px 10px 50px" }}>
                <h3> Nutritional Requirements </h3>
                <p style={{ paddingLeft: "11px" }}>All amounts are per 100g</p>

                {/* <p>Note: to fix different units and max/min amounts for different nutrients</p> */}
            </div>
            {/* original nutrient labels: sodium must be below 2000mg, protein must be below 100g */}

            {/* <!-- Nutrition requirement list --> */}

            {nutritionList.map((nutrient) => (
                <div class="col-md-4" style={{ paddingBottom: "10px" }} >
                    <div class="container d-flex" style={{ paddingLeft: "60px", paddingBottom: "20px" }}>
                        <div style={{width:"250px"}}>
                            <h4>{nutrient.name}</h4>
                            <div>(Must be below {getFormInfo(nutrient.id).max_limit} {getFormInfo(nutrient.id).unit})</div>

                            <div class="range_container">
                                <div class="sliders_control">
                                    <input type="range" min={getFormInfo(nutrient.id).min_limit} max={getFormInfo(nutrient.id).max_limit} step={getFormInfo(nutrient.id).step} id={`from_slider_${nutrient.id}`} name="min_val" value={nutrient.min_amount} onChange={updateNutrition}/>
                                    <input type="range" min={getFormInfo(nutrient.id).min_limit} max={getFormInfo(nutrient.id).max_limit} step={getFormInfo(nutrient.id).step} id={`to_slider_${nutrient.id}`} name="max_val" value={nutrient.max_amount} onChange={updateNutrition}/>
                                </div>
                                <div class="form_control">
                                    <div class="form_control_container">
                                        <div class="form_control_container__time">Min</div>
                                        <p class="form_control_container__time__input">{nutrient.min_amount}</p>
                                    </div>
                                    <div class="form_control_container">
                                        <div class="form_control_container__time">Max</div>
                                        <p class="form_control_container__time__input">{nutrient.max_amount}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default NutritionPane;