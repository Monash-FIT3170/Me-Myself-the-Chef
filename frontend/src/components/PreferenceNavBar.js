import React from 'react'
import '../css/preference.css'

function PrefNavBar(){
    const preferenceList = [
        "Dietary Requirements", 
        "Nutritional Requirements", 
        "Preparation Time", 
        "Recipe Complexity/Cooking Experience"
    ];

    const colSpan = 12/preferenceList.length

    return (
        <div class="row flex-fill navbar-padding">
            {preferenceList.map((pref) => (
                <div class={"col-md-" + colSpan + " text-center"} style={{opacity: "33%"}}>
                    <p>{pref}</p>
                </div>
            ))}

            <hr class="mx-auto" style={{marginTop: "15px", width: "75%"}}></hr>
        </div>
    )
}

export default PrefNavBar