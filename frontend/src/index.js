import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import PreferenceProvider from './context/PreferenceContext';
import './css/base.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <PreferenceProvider>
                <App />
            </PreferenceProvider>
        </AuthProvider>
    </React.StrictMode>
);
