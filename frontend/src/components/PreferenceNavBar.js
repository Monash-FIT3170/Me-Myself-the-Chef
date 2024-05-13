import React from 'react'
import '../css/preference.css'

function PrefNavBar(){
    return (
        <div class="row flex-fill navbar-padding">
            <div class="col-md-3 text-center" style={{color: "#458D59" }}>
                <strong>Dietary Requirements</strong>
            </div>
            <div class="col-md-3 text-center" style={{opacity: "33%"}}>
                <p>Nutritional Requirements</p>
            </div>
            <div class="col-md-3 text-center" style={{opacity: "33%"}}>
                <p>Preparation Time</p>
            </div>
            <div class="col-md-3 text-center" style={{opacity: "33%"}}>
                <p>Recipe Complexity/Cooking Experience</p>
            </div>
            <hr class="mx-auto" style={{marginTop: "15px", width: "75%"}}></hr>
        </div>
    )
}

export default PrefNavBar