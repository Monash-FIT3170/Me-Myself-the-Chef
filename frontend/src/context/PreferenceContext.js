import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// Create the context
export const PreferenceContext = createContext();

const PreferenceProvider = ({ children }) => {
    const [preferences, setPreferences] = useState([]);
    const [tempPreferences, setTempPreferences] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [tempSearchHistory, setTempSearchHistory] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // Load preferences and search history from local storage if user is not logged in
        if (!isLoggedIn) {
            const storedPreferences = JSON.parse(localStorage.getItem('preferences')) || [];
            const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
            setPreferences(storedPreferences);
            setSearchHistory(storedSearchHistory);
        }
    }, [isLoggedIn]);

    const updatePreferences = async (newPreferences) => {
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
        <PreferenceContext.Provider value={{ preferences, searchHistory, updatePreferences, updateSearchHistory }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export default PreferenceProvider;
