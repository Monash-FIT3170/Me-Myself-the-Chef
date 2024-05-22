import React from 'react'
import { useEffect, useState, useContext } from 'react';
import '../css/base.css'
import MissingIngredientPane from './MissingIngredientPane';
import { PreferenceContext } from '../context/PreferenceContext';

function MissingIngredientPreference() {

    // access to temp list for preferences
    const { allergies, setAllergies } = useContext(PreferenceContext);

    // obtain allergy list from local storage else return an empty list
    const [allergyList, setAllergyList] = useState(() => {
        return allergies;
    })

    // Listen for changes in the allergies context and update allergyList
    useEffect(() => {
        // Only update allergyList if allergies has changed
        if (JSON.stringify(allergies) !== JSON.stringify(allergyList)) {
            setAllergyList(allergies);
        }
    }, [allergies]);

    // function is only called everytime allergyList updates  
    useEffect(() => {
        // Only update allergies if allergyList has changed
        if (JSON.stringify(allergyList) !== JSON.stringify(allergies)) {
            setAllergies(allergyList);
        }
    }, [allergyList]);
    

    // function to add allergy to allergyList
    // if allergy is already in list, ignore
    function addAllergy(title) {
        setAllergyList((currentAllergies) => {
            if (currentAllergies.some(allergy => allergy.title === title)) {
                return [...currentAllergies]
            }

            return [
                ...currentAllergies,
                { id: crypto.randomUUID(), title: title }
            ]
        }
        )
    }

    // function to delete allergy from allergyList
    function deleteAllergy(id) {
        setAllergyList((currentAllergies) => {
            return currentAllergies.filter(
                allergy => allergy.id !== id
            )
        })
    }

    return (
        <MissingIngredientPane allergyList={allergyList} addAllergy={addAllergy} deleteAllergy={deleteAllergy} />
    );

}

export default MissingIngredientPreference

/*
function MissingIngredientPreference() {

    // access to temp list for preferences
    const { missingIngs, setMissingIngs } = useContext(PreferenceContext);

    // obtain allergy list from local storage else return an empty list
    const [missingIngredientList, setMissingIngredientList] = useState(() => {
        return missingIngs;
    })

    // Listen for changes in the allergies context and update allergyList
    useEffect(() => {
        // Only update ingredientList if ingredients has changed
        if (JSON.stringify(missingIngs) !== JSON.stringify(missingIngredientList)) {
            setMissingIngredientList(missingIngs);
        }
    }, [missingIngs]);

    // function is only called everytime ingredientList updates  
    useEffect(() => {
        // Only update allergies if ingredientList has changed
        if (JSON.stringify(missingIngredientList) !== JSON.stringify(missingIngs)) {
            setMissingIngs(missingIngredientList);
        }
    }, [missingIngredientList]);
    

    // function to add ingedient to missingIngredientList
    // if ingredient is already in list, ignore
    function addMissingIngredient(title) {
        setMissingIngredientList((currentMissingIngs) => {
            if (currentMissingIngs.some(ingredient => ingredient.title === title)) {
                return [...currentMissingIngs]
            }

            return [
                ...currentMissingIngs,
                { id: crypto.randomUUID(), title: title }
            ]
        }
        )
    }

    // function to delete ingredient from ingredientList
    function deleteMissingIngredient(title) {
        setMissingIngredientList((currentMissingIngredients) => {
            return currentMissingIngredients.filter(
                ingredient => ingredient.title!== title
            )
        })
    }

    return (
        <AllergyPane missingIngredientList={missingIngredientList} addMissingIngredient={addMissingIngredient} deleteMissingIngredient={deleteMissingIngredient} />
    );

}

export default MissingIngredientPreference
*/ 

