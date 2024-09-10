import React, { createContext, useState, useEffect, useContext } from 'react';
import { baseDietaryList, baseCuisineList, baseNutritionList } from '../utils/preferenceBaseLists';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// Create the context
export const PreferenceContext = createContext();

const PreferenceProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({});
    const [searchHistory, setSearchHistory] = useState([]);
    const [allergies, setAllergies] = useState([]); 
    const [nutrition, setNutrition] = useState(null); 
    const [diet, setDiet] = useState(null); 
    const [prepTime, setPrepTime] = useState('');
    const [cuisine, setCuisine] = useState([]); 
    const [servingSize, setServingSize] = useState('');
    const [loading, setLoading] = useState(true);

    const { isLoggedIn } = useContext(AuthContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        // Load preferences and search history from local storage if user is not logged in
        const storedPreferences = JSON.parse(localStorage.getItem('preferences')) || {};
        const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        if (Object.keys(storedPreferences).length > 0) {
            const storedDiets = storedPreferences.dietaryRequirements; 
            const storedAllergies = storedPreferences.allergies;
            const storedPrepTime = storedPreferences.maxPrepTime;
            const storedCuisine = storedPreferences.cuisines;
            const storedNutrition = storedPreferences.nutrition;
            const storedServingSize = storedPreferences.servingSize;
            
            setDiet(storedDiets);
            setAllergies(storedAllergies);
            setPrepTime(storedPrepTime);
            setCuisine(storedCuisine);
            setNutrition(storedNutrition);
            setServingSize(storedServingSize);
        } else {
            // Use base lists if no stored preferences are found
            setDiet(baseDietaryList);
            setAllergies([]);
            setPrepTime(null);
            setCuisine(baseCuisineList);
            setNutrition(baseNutritionList);
            setServingSize("1");
        }

        // Set preferences and search history
        setPreferences(storedPreferences);
        setSearchHistory(storedSearchHistory);

        // End the loading state after preferences are loaded
        setLoading(false);

    }, [isLoggedIn]);

    const updatePreferences = async () => {
        const newPreferences = {
            dietaryRequirements: diet,
            dietaryCombination: "test", // Replace with appropriate combination logic
            allergies: allergies,
            maxPrepTime: prepTime,
            cuisines: cuisine,
            servingSize: servingSize,
            nutrition: nutrition
        };

        setPreferences(newPreferences);
        localStorage.setItem('preferences', JSON.stringify(newPreferences));
        setAlertMessage('Preferences saved to <strong>local storage</strong>. Please login to save to the database.');
        setAlertType('success');

        if (isLoggedIn) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updatePreferences`, {
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

                setAlertMessage('Preferences saved to the <strong>database</strong> successfully.');
                setAlertType('success');
            } catch (error) {
                console.error('Network Error:', error);
                setAlertMessage('Failed to update preferences.');
                setAlertType('danger');
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

    // Only render children when loading is complete
    return (
        <PreferenceContext.Provider value={{ 
            preferences, searchHistory, 
            allergies, setAllergies, 
            diet, setDiet, 
            prepTime, setPrepTime, 
            cuisine, setCuisine,
            servingSize, setServingSize,
            nutrition, setNutrition,
            updatePreferences, updateSearchHistory, 
            alertMessage, alertType, setAlertMessage, 
            loading 
        }}>
            {!loading && children}  {/* Only render children when loading is done */}
        </PreferenceContext.Provider>
    );
};

export default PreferenceProvider;