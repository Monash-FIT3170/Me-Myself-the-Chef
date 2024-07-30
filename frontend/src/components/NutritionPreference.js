import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
//import DietaryPane from './DietaryPane';
import { PreferenceContext } from '../context/PreferenceContext';
import NutritionPane from './NutritionPane';

function NutritionPreference(){

    // access to temp list for preferences
    const { nutrition, setNutrition } = useContext(PreferenceContext);

    // base dietary list
    // if you make changes to this after running, you must clear localStorage to see changes
    const baseNutritionList = [
        {id: 0, name: "Sodium", min_amount: 0, max_amount: 100},
        {id: 1, name: "Protein", min_amount: 0, max_amount: 100},
    ]
    
    // obtains the nutrition list from localStorage or uses the base one
    // sets the list as an object to handle in js
    const [nutritionList, setNutritionList] = useState(() => {
        if (nutrition == null){
            return baseNutritionList;
        }
        else {
            return nutrition
        }
    })

    // Listen for changes in the nutrition context and update nutritionList
    useEffect(() => {
        setNutritionList(nutrition || baseNutritionList);
    }, [nutrition]);

    // converts object into JSON and sets it into localStorage
    useEffect(() => {
        setNutrition(nutritionList)
    }, [nutritionList]);


    // updates the nutrition list based on the new input value
    const updateNutrition = (event) => {
        const id = event.target.id;
        let input_type = event.target.name;
        let new_amount = parseInt(event.target.value);

        console.log(`${id}: ${input_type}, ${new_amount}`)

        let updatedObj = {}
        if (input_type === "min_val") {
            updatedObj = {...nutritionList[id], min_amount: new_amount};
        }
        else {
            updatedObj = {...nutritionList[id], max_amount: new_amount};
        }
        console.log(updatedObj)

        setNutritionList(
            nutritionList.map( obj =>
                obj.id === updatedObj.id ? updatedObj : obj
            )
        )
    }

    function OnChangeEvent() {
        alert("value is changed");
    }

    return (
        <NutritionPane nutritionList = {nutritionList} updateNutrition={updateNutrition} />
    )

}

export default NutritionPreference