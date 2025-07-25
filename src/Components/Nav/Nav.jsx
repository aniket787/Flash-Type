import React from 'react';
import logo from './../../assets/logo.png';
import './Nav.css'

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img className="flash-logo" src={logo} alt="logo" />

                <p className="flash-logo-text">FlashType</p>


            </div>


            <div className="nav-right">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">r</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className = "navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                    </div>
                </nav>
            </div>
        </div>

    );
}

export default Nav;