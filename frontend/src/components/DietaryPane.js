import React from 'react'

function DietaryPane({ dietaryList, updateDietary }){

    return (
        <div class="col-md-4">
            <div class="row text-left" style={{padding: "10px 0px 20px 50px" }}>
                <h3> Dietary Requirements </h3>
            </div>

            {/* <!-- Dietary requirement list --> */}
            <div class="container d-flex" style={{ paddingLeft: "60px" }}>
                <div class="list-group">
                    {dietaryList.map((diet) => (
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" id = {diet.id} checked={diet.state} onChange={updateDietary}/>
                            {diet.name}
                        </label>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default DietaryPane