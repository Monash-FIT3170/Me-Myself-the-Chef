import { React, useContext } from 'react';
import AllergyPreference from './AllergyPreference';
import DietaryPreference from './DietaryPreference';
import NutritionPreference from './NutritionPreference';
import MissingIngredientPreference from './MissingIngredientPreference';
import '../css/preference.css';
import { PreferenceContext } from '../context/PreferenceContext';

export function DietaryInformation() {
    const { updatePreferences, alertMessage, alertType, setAlertMessage } = useContext(PreferenceContext);

    return (
        <div className="row">
            {/* Dietary Requirements column */}
            <DietaryPreference />

            {/* Allergy Consideration column */}
            <AllergyPreference />


            {/* MissingIngredient Consideration column*/}        
            {/*<MissingIngredientPreference />  commenting out for now ... will continue implementation later */}

            {/* Save Preferences Button Column */}
            <div className="container">
                {alertMessage && (
                    <div className={`alert alert-${alertType} alert-dismissible fade show custom-alert`} role="alert">
                        <span dangerouslySetInnerHTML={{ __html: alertMessage }}></span>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertMessage('')}></button>
                    </div>
                )}
                <button className="save-pref-button" onClick={updatePreferences}>Save Preferences</button>
            </div>
        </div>
    )
}

export function NutritionInformation() {
    const { updatePreferences, alertMessage, alertType, setAlertMessage } = useContext(PreferenceContext);

    return (
        <div className="row">
            {/* Nutrition column */}
            <NutritionPreference />
            <div className="container">
                {alertMessage && (
                    <div className={`alert alert-${alertType} alert-dismissible fade show custom-alert`} role="alert">
                        <span dangerouslySetInnerHTML={{ __html: alertMessage }}></span>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertMessage('')}></button>
                    </div>
                )}
                <button className="save-pref-button" onClick={updatePreferences}>Save Preferences</button>
            </div>
        </div>
    )
}

export function PreparationTimeInformation() {
    const { updatePreferences, alertMessage, alertType, setAlertMessage } = useContext(PreferenceContext);

    return (
        <div className="row">
            {/* Preparation Time column */}
            <div className="col-md-4"></div>

            <div className="col-md-4"></div>

            {/* Save Preferences Button Column */}
            <div className="container">
                {alertMessage && (
                    <div className={`alert alert-${alertType} alert-dismissible fade show custom-alert`} role="alert">
                        <span dangerouslySetInnerHTML={{ __html: alertMessage }}></span>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertMessage('')}></button>
                    </div>
                )}
                <button className="save-pref-button" onClick={updatePreferences}>Save Preferences</button>
            </div>
        </div>
    )
}
