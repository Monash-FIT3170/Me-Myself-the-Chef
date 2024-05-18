import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoggedInPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="main_box">
            <div className="form">
                <center>
                    <h1>You are logged in!</h1>
                    <button className="logout_button" onClick={handleLogout}>Logout</button>
                </center>
            </div>
            <img className="login_image" src="/static/images/login_image.jpg" alt="Logo" />
        </div>
    );
};

export default LoggedInPage;
