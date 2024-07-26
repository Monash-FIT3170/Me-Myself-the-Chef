import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
//import DietaryPane from './DietaryPane';
import { PreferenceContext } from '../context/PreferenceContext';

function NutritionPreference(){

    return (
        <div class="col-md-4">
            <div class="row text-left" style={{padding: "50px 0px 20px 50px" }}>
                <h3> Nutrition Requirements </h3>
            </div>

            {/* <!-- Nutrition requirement list --> */}
            <div class="container d-flex" style={{ paddingLeft: "60px", paddingBottom: "60px" }}>
                <div class="list-group">
                    <label style={{ borderColor: "transparent" }}>
                        Minimum sodium per 100 g (0 mg - 2000 mg)
                    </label>
                    <input type="number" min="0" max="2000" step="100" />
                    <label style={{ borderColor: "transparent" }}>
                        Maximum sodium per 100 g (0 mg - 2000 mg)
                    </label>
                    <input type="number" min="0" max="2000" step="100"/>
                </div>
            </div>
        </div>
    )

}

export default NutritionPreference