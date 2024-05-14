import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by inspecting localStorage or sessionStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory));
        localStorage.setItem('preferences', JSON.stringify(data.preferences));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('searchHistory');
        localStorage.removeItem('preferences');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
