import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// Create the context
export const PreferenceContext = createContext();

const PreferenceProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);
    const [allergies, setAllergies] = useState([]); 
    const [diet, setDiet] = useState(null); 
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Load preferences and search history from local storage if user is not logged in
        const storedPreferences = JSON.parse(localStorage.getItem('preferences')) || {};
        const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        //var storedDiets = null; 
        //var storedAllergies = [];

        //console.log(storedPreferences.dietaryRequirements);
        if (Object.keys(storedPreferences).length > 0) {
            const storedDiets = storedPreferences.dietaryRequirements; 
            const storedAllergies = storedPreferences.allergies;
            
            setDiet(storedDiets);
            setAllergies(storedAllergies);
        }
        
        setPreferences(storedPreferences);
        setSearchHistory(storedSearchHistory);
    }, []);

    useEffect(() => {
        console.log(diet);
    }, [diet]);
    

    const updatePreferences = async () => {
        // Combine allergies and diet into an object
        const newPreferences = {
            dietaryRequirements: diet,
            allergies: allergies
        };

        setPreferences(newPreferences);
        localStorage.setItem('preferences', JSON.stringify(newPreferences));
        if (isLoggedIn) {
            try {
                await axios.post('/api/auth/updatePreferences', newPreferences, {
                    headers: { 'x-access-token': localStorage.getItem('token') }
                });
            } catch (error) {
                console.error('Error updating preferences', error);
            }
        }
    };

    const updateSearchHistory = async (newSearchHistory) => {
        setSearchHistory(newSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
        if (isLoggedIn) {
            try {
                await axios.post('/api/auth/updateSearchHistory', newSearchHistory, {
                    headers: { 'x-access-token': localStorage.getItem('token') }
                });
            } catch (error) {
                console.error('Error updating search history', error);
            }
        }
    };

    return (
        <PreferenceContext.Provider value={{ preferences, searchHistory, allergies, setAllergies, diet, setDiet, updatePreferences, updateSearchHistory }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export default PreferenceProvider;
