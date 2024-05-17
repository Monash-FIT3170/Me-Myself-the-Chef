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

        console.log(isLoggedIn);
        console.log(storedPreferences);
        console.log(localStorage.getItem('preferences'));

        if (Object.keys(storedPreferences).length > 0) {
            const storedDiets = storedPreferences.dietaryRequirements; 
            const storedAllergies = storedPreferences.allergies;
            
            setDiet(storedDiets);
            setAllergies(storedAllergies);
        }
        else {
            setDiet(null);
            setAllergies([]);
        }
        
        setPreferences(storedPreferences);
        setSearchHistory(storedSearchHistory);
    }, [isLoggedIn]);

    const updatePreferences = async () => {
        // Combine allergies and diet into an object
        const newPreferences = {
            dietaryRequirements: diet,
            dietaryCombination: "test",
            allergies: allergies,
            maxPrepTime: 0
        };

        setPreferences(newPreferences);
        localStorage.setItem('preferences', JSON.stringify(newPreferences));
        if (isLoggedIn) {
            try {
                const response = await fetch('http://localhost:8080/api/auth/updatePreferences', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(newPreferences)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update user preferences');
                }
    
            } catch (error) {
                console.error('Token Error:', error);
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
