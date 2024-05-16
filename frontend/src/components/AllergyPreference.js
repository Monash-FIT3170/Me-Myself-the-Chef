import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
import AllergyPane from './AllergyPane';
import { PreferenceContext } from '../context/PreferenceContext';

function AllergyPreference(){

    // access to temp list for preferences
    const { allergies, setAllergies } = useContext(PreferenceContext);
    
    // obtain allergy list from local storage else return an empty list
    const [allergyList, setAllergyList] = useState(() => {
        return allergies
    })

    // function is only called everytime allergyList updates
    // function updates local storage of updated allergyList
    useEffect(() => {
        setAllergies(allergyList)
    }, [allergyList])

    // function to add allergy to allergyList
    // if allergy is already in list, ignore
    function addAllergy(title) {
        setAllergyList((currentAllergies) => {
            if (currentAllergies.some(allergy => allergy.title === title)) {
                return [...currentAllergies]
            }

                return [
                    ...currentAllergies,
                    {id: crypto.randomUUID(), title: title}
            ]}
        )
    }

    // function to delete allergy from allergyList
    function deleteAllergy(id){
        setAllergyList((currentAllergies) => {
            return currentAllergies.filter(
                allergy => allergy.id !== id
            )
        })
    }

    return(
        <AllergyPane allergyList={allergyList} addAllergy={addAllergy} deleteAllergy={deleteAllergy} />
    );

}

export default AllergyPreference