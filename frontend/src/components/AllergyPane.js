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
                <h3> Allergies & Intolerances </h3>
                {/*<p> * note that these will be omitted from recipes</p>*/}
            </div>

            {/* <!-- Auto Complete Searchbar --> */}
            <div class="container">
                <AllergySearchBar onAllergySearch={onAllergySearch}/>
            </div>
            {'       '}

            {/* <!-- Selected allergies list --> */}
            <div class="row text-left" style= {{paddingLeft: "25px", paddingTop: "10px" }}>
                <h5>Allergies/Intolerances:</h5>
                <h8>{allergyList.length === 0 && "No Allergies or Intolerances Recorded"}</h8>
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