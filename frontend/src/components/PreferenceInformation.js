import { React, useContext } from 'react'
import AllergyPreference from './AllergyPreference';
import DietaryPreference from './DietaryPreference';
import '../css/preference.css'
import { PreferenceContext } from '../context/PreferenceContext';

export function DietaryInformation() {
    const { updatePreferences } = useContext(PreferenceContext);

    return (
        <div class="row">

            {/*<!-- Dietary Requirements column -->*/}
            <DietaryPreference />

            {/*<!-- Allergy Consideration column -->*/}
            <AllergyPreference />

            {/*<!-- Save Preferences Button Column -->*/}
            <div class="container">
                <button class="save-pref-button" onClick={updatePreferences}>Save Preferences</button>

            </div>
        </div>
    )
}

export function PreparationTimeInformation() {

    return (
        <div class="row">
            {/* Preparation Time column */}
            <div class="col-md-4"></div>

            <div class="col-md-4"></div>

            {/*<!-- Save Preferences Button Column -->*/}
            <div class="container">
                <button class="save-pref-button">Save Preferences</button>

            </div>
        </div>
    )
}