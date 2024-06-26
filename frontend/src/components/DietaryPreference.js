import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
import DietaryPane from './DietaryPane';
import { PreferenceContext } from '../context/PreferenceContext';

function DietaryPreference(){

    // access to temp list for preferences
    const { diet, setDiet } = useContext(PreferenceContext);

    // base dietary list
    // if you make changes to this after running, you must clear localStorage to see changes
    const baseDietaryList = [
        {id: 0, name: "Gluten Free", state: false},
        {id: 1, name: "Ketogenic", state: false},
        {id: 2, name: "Vegetarian", state: false},
        {id: 3, name: "Vegan", state: false},
        {id: 4, name: "Pescetarian", state: false},
        ]
    
    // obtains the dietary list from localStorage or uses the base one
    // sets the list as an object to handle in js
    const [dietaryList, setDietaryList] = useState(() => {
        if (diet == null) return baseDietaryList
        return diet
    })

    // Listen for changes in the diet context and update dietaryList
    useEffect(() => {
        setDietaryList(diet || baseDietaryList);
    }, [diet]);

    // converts object into JSON and sets it into localStorage
    useEffect(() => {
        setDiet(dietaryList)
    }, [dietaryList])


    // updates the dietary list based on the checkbox checked status
    const updateDietary = (event) => {
        const id = event.target.id
        let checked = event.target.checked

        const updatedObj = {...dietaryList[id], state: checked}

        setDietaryList(
            dietaryList.map( obj =>
                obj.id === updatedObj.id ? updatedObj : obj
            )
        )
    }

    return (
        <DietaryPane dietaryList = {dietaryList} updateDietary={updateDietary} />
    )

}

export default DietaryPreference