import React from 'react';
import { Link } from "react-router-dom";
import '../css/base.css'


function Navbar() {
    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                
                <Link className='react_link' to="/ingredients">
                    <a className="navbar-brand px-2" href="#">
                        {/* TODO: make an actual logo for this text */}
                        
                        Me Myself the Chef
                        <img src="/static/images/logo_small.png"  height="50" alt="Logo" className="d-inline-block ms-2" />
                    </a>
                </Link>

                {/* This button appears when the window is too small: hamburger button for showing the navbar items*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* The header links */}
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item px-2">
                            <Link className='react_link' to="/ingredients">
                                <a className="nav-link" href="#">Recipe Search</a>
                            </Link>

                        </li>

                        <li className="nav-item px-2">
                            <Link className='react_link' to="/ingredients">
                                <a className="nav-link" href="#">Saved Recipes</a>
                            </Link>
                        </li>

                        <li className="nav-item px-2">
                            <Link className='react_link' to="/ingredients">
                                <a className="nav-link" href="#">Preferences</a>
                            </Link>
                        </li>
                        
                        {/* TODO: possibly some dynamic imagery to show whether they're signed in or not*/}
                        {/* Also the login favicon currently is black, doesn't look amazing*/}
                        <Link className='react_link' to="/login">
                            <a className="navbar-brand px-4" href="#">
                                <img src="/static/images/person-circle.svg" alt="Login" width="30" height="30" />
                            </a>
                        </Link>
                        
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
