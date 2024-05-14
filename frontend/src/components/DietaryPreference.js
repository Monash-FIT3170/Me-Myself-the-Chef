import React from 'react'
import { useEffect, useState } from 'react';
import '../css/base.css'
import DietaryPane from './DietaryPane';

function DietaryPreference(){
    
    const [dietaryList, setDietaryList] = useState([
        {name: "Gluten Free", state: ""},
        {name: "Ketogenic", state: ""},
        {name: "Vegetarian", state: ""},
        {name: "Vegan", state: ""},
        {name: "Pescetarian", state: ""},
    ])

    const updateDietary = (event) => {
        const { name, state } = event.target
        setDietaryList({...dietaryList,[name]: state});
    }
}

export default DietaryPreference