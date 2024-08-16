import React from 'react'
import PrefNavBar from '../components/PreferenceNavBar'
import { DietaryInformation, NutritionInformation, PreparationTimeInformation } from '../components/PreferenceInformation'
import '../css/preference.css'
import '../css/slider.css'


export const Preference = () => {
    return (
        <div class="row h-25">
            <div class="container h-100 d-flex flex-column">

                {/* <!-- Title card for the Preference page --> */}
                <div class="row flex-grow-1 title-card">
                    <div class="row text-left text-white title-padding">
                        <h2> Recipe Preferences </h2>
                    </div>
                    <div class="row text-left text-white info-padding">
                        <p> Please enter your preferences below for your generated recipes. If you have no preference for an option, just leave it blank! </p>
                    </div>
                </div>

                {/* Preference NavBar */}
                <PrefNavBar />

                {/* Select a Preference Category above to view and adjust your preferences */}
                <div class="container text-center">
                    <h2> Select a preference category above to view and adjust your preferences! </h2>
                </div>

            </div>
        </div>
    )
}

export const DietaryRequirements = () => {
    return (
        <div class="row h-25">
            <div class="container h-100 d-flex flex-column">

                {/* <!-- Title card for the Preference page --> */}
                <div class="row flex-grow-1 title-card">
                    <div class="row text-left text-white title-padding">
                        <h2> Recipe Preferences </h2>
                    </div>
                    <div class="row text-left text-white info-padding">
                        <p> Please enter your preferences below for your generated recipes. If you have no preference for an option, just leave it blank! </p>
                    </div>
                </div>

                {/* Preference NavBar */}
                <PrefNavBar id={0}/>

                {/* Specified Preference Information */}
                <DietaryInformation />

            </div>
        </div>
    )
}

export const NutritionRequirements = () => {
    return (
        <div class="row h-25">
            <div class="container h-100 d-flex flex-column">

                {/* <!-- Title card for the Preference page --> */}
                <div class="row flex-grow-1 title-card">
                    <div class="row text-left text-white title-padding">
                        <h2> Recipe Preferences </h2>
                    </div>
                    <div class="row text-left text-white info-padding">
                        <p> Please enter your preferences below for your generated recipes. If you have no preference for an option, just leave it blank! </p>
                    </div>
                </div>

                {/* Preference NavBar */}
                <PrefNavBar id={1}/>

                {/* Specified Preference Information */}
                <NutritionInformation/>

            </div>
        </div>
    )
}

export const PreparationTime = () => {
    return (
        <div class="row h-25">
            <div class="container h-100 d-flex flex-column">

                {/* <!-- Title card for the Preference page --> */}
                <div class="row flex-grow-1 title-card">
                    <div class="row text-left text-white title-padding">
                        <h2> Recipe Preferences </h2>
                    </div>
                    <div class="row text-left text-white info-padding">
                        <p> Please enter your preferences below for your generated recipes. If you have no preference for an option, just leave it blank! </p>
                    </div>
                </div>

                {/* Preference NavBar */}
                <PrefNavBar id={2}/>

                {/* Specified Preference Information */}
                <PreparationTimeInformation />

            </div>
        </div>
    )
}

