import React from "react";

function NutritionPane({ nutritionList, updateNutrition }) {

    return (
        <div class="col-md-4" style={{paddingBottom: "60px"}} >
            <div class="row text-left" style={{padding: "50px 0px 20px 50px" }}>
                <h3> Nutritional Requirements </h3>
                <p style={{ paddingLeft: "11px"}}>All amounts are per 100g</p>

                <p>Note: to fix different units and max/min amounts for different nutrients</p>
            </div>

            {/* original nutrient labels: sodium must be below 2000mg, protein must be below 100g */}
            
            {/* <!-- Nutrition requirement list --> */}

            {nutritionList.map((nutrient) => (
                <div class="container d-flex" style={{ paddingLeft: "60px", paddingBottom: "20px"}}>
                    <div class="list-group">
                        <h4>{nutrient.name}</h4>
                        <div>(Must be below XXX mg or g (to change))</div>

                        {/* TODO: put inputs inside label tags maybe */}
                        <label style={{ borderColor: "transparent" }}>
                            Min 
                        </label>
                        <div style={{ display: "flex" }}>
                            <input style={{ width: "70px" }} type="number" min="0" max="2000" step="100" id={nutrient.id} name="min_val" placeholder={nutrient.min_amount} onChange={updateNutrition} />
                            <span style={{ paddingLeft: "10px" }}>mg or g</span>
                        </div>
                        <label style={{ borderColor: "transparent" }}>
                            Max
                        </label>
                        <div style={{ display: "flex" }}>
                            <input style={{ width: "70px" }} type="number" min="0" max="2000" step="100" id={nutrient.id} name="max_val" placeholder={nutrient.max_amount} onChange={updateNutrition}/>
                            <span style={{ paddingLeft: "10px" }}>mg or g</span>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default NutritionPane;