import React from 'react'
import PrefNavBar from '../components/PreferenceNavBar'
import PreferenceInformation from '../components/PreferenceInfo'
import '../css/preference.css'


const Preference = () => {
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

                {/* Specified Preference Information */}
                <PreferenceInformation />

            </div>
        </div>
    )
}

export default Preference