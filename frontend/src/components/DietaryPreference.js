import React from 'react'
import { useEffect, useState } from 'react';
import '../css/base.css'
import DietaryPane from './DietaryPane';

function DietaryPreference(){

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
        const localValue = localStorage.getItem("DIETS")
        if (localValue == null) return baseDietaryList

        return JSON.parse(localValue)
    })

    // converts object into JSON and sets it into localStorage
    useEffect(() => {
        localStorage.setItem("DIETS", JSON.stringify(dietaryList))
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