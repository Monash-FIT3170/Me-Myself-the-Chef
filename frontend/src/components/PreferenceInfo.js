import React from 'react'
import AllergyPreference from '../components/AllergyPreference';
import DietaryPreference from './DietaryPreference';
import '../css/preference.css'

function PreferenceInformation() {

    return (
        <div class="row">

            {/*<!-- Dietary Requirements column -->*/}
            <DietaryPreference />

            {/*<!-- Allergy Consideration column -->*/}
            <AllergyPreference />

            {/*<!-- Save Preferences Button Column -->*/}
            <div class="container">
                <button class="save-pref-button">Save Preferences</button>

            </div>
        </div>
    )
}

export default PreferenceInformation