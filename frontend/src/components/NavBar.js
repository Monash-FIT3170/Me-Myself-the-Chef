import React, { useContext, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import '../css/base.css';

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <Link className='react_link' to="/ingredients">
                        <span className="navbar-brand px-2">
                            <img src="/static/images/header_logo.png" height="60" alt="Logo" className="d-inline-block ms-2" />
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
                                <Link className='react_link' to="/saved_recipe">
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
                                    <button className="btn btn-danger" onClick={handleShowModal}>Logout</button>
                                </li>
                            ) : (
                                <li className="nav-item px-2">
                                    <Link to="/login">
                                        <button className="btn btn-success">Sign In</button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Logout</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to logout?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
