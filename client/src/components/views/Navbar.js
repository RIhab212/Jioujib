// Navbar.js

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../adminInterface.css';
import Productsadmin from '../views/productsadmin';
import Validrecords from '../views/validrecords';
import home from "./home.png";
import acceuil from "./accueil.png";
import deliv from "./deliv.png";
import accepted from "./accepted.png";
import logo from "./logo.png";
import logoout from "./logout.png";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSidebarOpen: false
        };
    }

    toggleSidebar = () => {
        this.setState((prevState) => ({
            isSidebarOpen: !prevState.isSidebarOpen
        }));
    };

    // Your existing componentDidMount and render methods...

    render() {
        const { isSidebarOpen } = this.state;
        return (
            <div>
                <div className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`} onClick={this.toggleSidebar}>
                    <i className="fa fa-bars"></i>
                </div>
                <img src={logo} alt="" className="icone-logo" />
                <div className={`nav-links ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <NavLink to="/Home" className="icone-wrapper">
                    <img src={acceuil} alt="" className="icone-css" />
                    <span className="icone-texte">Home</span>
                </NavLink>
                <NavLink to="/Productsadmin" className="icone-wrapper">
                    <img src={home} alt="" className="icone-css1" />
                    <span className="icone-texte-valid">Orders</span>
                </NavLink>
                <NavLink  to="/Validrecords"  className="icone-wrapper">
                    <img src={accepted} alt="" className="icone-css2" />
                    <span className="icone-texte-products">Accepted Orders</span>
                </NavLink>
                <NavLink to="/OrderA"  className="icone-wrapper">
                    <img src={deliv} alt="" className="icone-css3" />
                    <span className="icone-texte-deliv">  Delivered Orders</span>
                </NavLink>
                <NavLink  to="/login"className="icone-wrapper">
                    <img src={logoout} alt="" className="icone-css4" />
                    <span className="icone-texte-logout"> Log out</span>
                </NavLink>
                </div>
                </div>

        );

    }
}

export default Navbar;
