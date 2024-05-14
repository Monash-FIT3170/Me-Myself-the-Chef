import React from 'react';
import AllergySearchBar from './AllergyAutoSearchBar';
import Allergy from './Allergy'


function AllergyPane({allergyList, addAllergy, deleteAllergy}) {

    // function to handle the user searching an allergy
    function onAllergySearch(allergy) {
        console.log(allergy);
        addAllergy(allergy);
    }

    return (
        <div class="col-md-4">
            <div class="row text-center p-5">
                <h3> Allergy/Intolerance Considerations </h3>
            </div>

            {/* <!-- Auto Complete Searchbar --> */}
            <div class="container">
                <AllergySearchBar onAllergySearch={onAllergySearch}/>
            </div>

            {/* <!-- Selected allergies list --> */}
            <div class="row text-left" style= {{paddingLeft: "25px", paddingTop: "10px" }}>
                <p>Allergies/Intolerances:</p>
            </div>
            <div class="container px-4">
                {allergyList.map((allergy) => {
                    return (
                    < Allergy
                    {...allergy}
                    key={allergy.id}
                    deleteAllergy={deleteAllergy} />
                    )
                })}
            </div>
        </div>
            
    );
}

export default AllergyPane;