import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
//import DietaryPane from './DietaryPane';
import { PreferenceContext } from '../context/PreferenceContext';

function NutritionPreference(){

    return (
        <div class="col-md-4" style={{paddingBottom: "60px"}} >
            <div class="row text-left" style={{padding: "50px 0px 20px 50px" }}>
                <h3> Nutritional Requirements </h3>
                <p style={{ paddingLeft: "11px"}}>All amounts are per 100g</p>
            </div>
            
            {/* <!-- Nutrition requirement list --> */}
            <div class="container d-flex" style={{ paddingLeft: "60px", paddingBottom: "20px"}}>
                <div class="list-group">
                    <h4>Sodium</h4>
                    <div>(Must be below 2000 mg)</div>
                    <label style={{ borderColor: "transparent" }}>
                        Min 
                    </label>
                    <div style={{ display: "flex" }}>
                        <input style={{ width: "70px" }} type="number" min="0" max="2000" step="100"  />
                        <span style={{ paddingLeft: "10px" }}>mg</span>
                    </div>
                    <label style={{ borderColor: "transparent" }}>
                        Max
                    </label>
                    <div style={{ display: "flex" }}>
                        <input style={{ width: "70px" }} type="number" min="0" max="2000" step="100" />
                        <span style={{ paddingLeft: "10px" }}>mg</span>
                    </div>
                </div>
                
            </div>
            <div class="container d-flex" style={{ paddingLeft: "60px", paddingBottom: "20px" }}>
                <div class="list-group">
                    <h4>Protein</h4>
                    <div>(Must be below 100 g)</div>
                    <label style={{ borderColor: "transparent" }}>
                        Min 
                    </label>
                    <div style={{ display: "flex" }}>
                        <input style={{ width: "70px" }} type="number" min="0" max="100" step="5"  />
                        <span style={{ paddingLeft: "10px" }}>g</span>
                    </div>
                    <label style={{ borderColor: "transparent" }}>
                        Max
                    </label>
                    <div style={{ display: "flex" }}>
                        <input style={{ width: "70px" }} type="number" min="0" max="100" step="5" />
                        <span style={{ paddingLeft: "10px" }}>g</span>
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default NutritionPreference