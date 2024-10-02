import React from "react";
import logo from "../logo.svg"
// importing bootstrap css to make the navbar look better
import 'bootstrap/dist/css/bootstrap.css';
// importing NavLink to create links in the navbar
import { NavLink } from 'react-router-dom';
// Displaying the navbar
export default function Navbar() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                <img style={{"width" : 25 +'%'}} src={logo}></img>
            </NavLink>
            <div className="navbar" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                   <NavLink className="nav-link" to="/">
                   List
                   </NavLink>
                     <NavLink className="nav-link" to="/create">
                     Create Post
                     </NavLink>
                    <NavLink className="nav-link" to="/register"
                    >Register
                    </NavLink>
                    <NavLink className="nav-link" to="/login">
                    Login
                    </NavLink>
                </ul>
            </div>
        </nav>
    </div>
);
}  