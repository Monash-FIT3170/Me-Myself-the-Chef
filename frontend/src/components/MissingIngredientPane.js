import React from 'react';
import IngredientSearchBar from './AutoSearchBar';
import AutoSearchBar from '../components/AutoSearchBar';
import Allergy from './Allergy'


function MissingIngredientPane({allergyList, addAllergy, deleteAllergy}) {

    // function to handle the user searching an allergy
    function onIngredientSearch(allergy) {
        console.log(allergy);
        addAllergy(allergy);
    }

    return (
        <div class="col-md-4">
            <div class="row text-center p-5">
                <h3> Ingredients to Disable </h3>
            </div>

            {/* <!-- Auto Complete Searchbar --> */}
            <div class="container">
                <AutoSearchBar onIngredientSearch={onIngredientSearch}/>
            </div>

            {/* <!-- Selected allergies list --> */}
            <div class="row text-left" style= {{paddingLeft: "25px", paddingTop: "10px" }}>
                <p>Ingredient:</p>
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

export default MissingIngredientPane;