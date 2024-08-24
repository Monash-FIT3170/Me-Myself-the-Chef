import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
//import DietaryPane from './DietaryPane';
import { PreferenceContext } from '../context/PreferenceContext';
import { baseNutritionList } from '../utils/preferenceBaseLists';
import NutritionPane from './NutritionPane';

function NutritionPreference() {
    // access to temp list for preferences
    const { nutrition, setNutrition } = useContext(PreferenceContext);

    useEffect(
        () => {
            for (let i = 0; i <= baseNutritionList.length - 1; i++) {
                // set slider fill colour
                let from_slider = document.querySelector(`#from_slider_${i}`);
                let to_slider = document.querySelector(`#to_slider_${i}`);
                fillSlider(from_slider, to_slider, '#C6C6C6', '#25daa5', to_slider);
            }
        }
    )
    
    // obtains the nutrition list from localStorage or uses the base one
    // sets the list as an object to handle in js
    const [nutritionList, setNutritionList] = useState(() => {
        return nutrition
    })

    // Listen for changes in the nutrition context and update nutritionList
    useEffect(() => {
        setNutritionList(nutrition || baseNutritionList);
    }, [nutrition]);

    // converts object into JSON and sets it into localStorage
    useEffect(() => {
        setNutrition(nutritionList)
    }, [nutritionList]);


    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max-to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
          ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
          ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
          ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
          ${sliderColor} 100%)`;
    }


    // updates the nutrition list based on the new input value
    const updateNutrition = (event) => {

        // edited nutrition field is identifiable by its id (nutrient id) and name (min_val or max_val)
        const id = parseInt(event.target.id.split("_").pop());
        let input_type = event.target.name;
        let new_amount = parseInt(event.target.value);

        let from_value = document.querySelector(`#from_slider_${id}`).value;
        let to_value = document.querySelector(`#to_slider_${id}`).value;

        let updatedObj = {}
        if (input_type === "min_val") {
            if (new_amount < to_value){
                updatedObj = {...nutritionList[id], min_amount: new_amount};
            }
        }
        else {
            if (new_amount > from_value){
                updatedObj = {...nutritionList[id], max_amount: new_amount};
            }
        }

        setNutritionList(
            nutritionList.map( obj =>
                obj.id === updatedObj.id ? updatedObj : obj
            )
        )

        // set slider fill colour
        let from_slider = document.querySelector(`#from_slider_${id}`);
        let to_slider = document.querySelector(`#to_slider_${id}`);
        fillSlider(from_slider, to_slider, '#C6C6C6', '#25daa5', to_slider);
    }

    return (
        <NutritionPane nutritionList = {nutritionList} updateNutrition={updateNutrition} />
    )

}

export default NutritionPreference