import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if the user is logged in by inspecting localStorage or sessionStorage
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        setIsLoggedIn(!!token);
        setUsername(storedUsername || '');
    }, []);

    const login = async (data) => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        //localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory));
        await retrievePreferences();
        await retrieveSavedRecipes();
        setUsername(data.username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('searchHistory');
        localStorage.removeItem('preferences');
        localStorage.removeItem('username');
        setUsername('');
        setIsLoggedIn(false);
    };

    const retrievePreferences = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/getPreferences', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user preferences');
            };

            const data = await response.json();
        
            const preferences = data.preferences;
            delete preferences._id;

            localStorage.setItem('preferences', JSON.stringify(preferences));

        } catch (error) {
            console.error('Network Error:', error);
        }
    };

    const retrieveSavedRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/getSavedRecipes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            localStorage.setItem('saved_recipes', JSON.stringify(data));
        } catch (error) {
            console.error('Network Error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
