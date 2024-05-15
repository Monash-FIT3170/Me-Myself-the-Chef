import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import '../css/base.css';

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                
                <Link className='react_link' to="/ingredients">
                    <span className="navbar-brand px-2">
                        Me Myself the Chef
                        <img src="/static/images/logo_small.png" height="50" alt="Logo" className="d-inline-block ms-2" />
                    </span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item px-2">
                            <Link className='react_link' to="/ingredients">
                                <span className="nav-link">Recipe Search</span>
                            </Link>
                        </li>

                        <li className="nav-item px-2">
                            <Link className='react_link' to="/ingredients">
                                <span className="nav-link">Saved Recipes</span>
                            </Link>
                        </li>

                        <li className="nav-item px-2">
                            <Link className='react_link' to="/preferences">
                                <span className="nav-link">Preferences</span>
                            </Link>
                        </li>

                        {isLoggedIn ? (
                            <li className="nav-item px-2">
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item px-2">
                                <Link to="/login">
                                    <button className="btn btn-primary">Sign In</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
