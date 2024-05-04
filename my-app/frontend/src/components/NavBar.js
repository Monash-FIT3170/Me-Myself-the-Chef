import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                
                <a className="navbar-brand px-2" href="#">
                    {/* TODO: make an actual logo for this text */}
                    Me Myself the Chef
                    <img src="%PUBLIC_URL%/page_templates/static/images/logo_small.png"  height="50" alt="Logo" className="d-inline-block ms-2" />
                </a>

                {/* This button appears when the window is too small: hamburger button for showing the navbar items*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* The header links */}
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item px-2">
                            <a className="nav-link" href="#">Recipe Search</a>
                        </li>

                        <li className="nav-item px-2">
                            <a className="nav-link" href="#">Saved Recipes</a>
                        </li>

                        <li className="nav-item px-2">
                            <a className="nav-link" href="#">Preferences</a>
                        </li>
                        
                        {/* TODO: possibly some dynamic imagery to show whether they're signed in or not*/}
                        {/* Also the login favicon currently is black, doesn't look amazing*/}
                        <a className="navbar-brand px-4" href="#">
                            <img src="%PUBLIC_URL%/page_templates/static/images/person-circle.svg" alt="Login" width="30" height="30" />
                        </a>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
