import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-collapse collapse">
                        <HeaderHome/>
                        <HeaderAuth/>
                    </div>
                </div>
            </div>
        );
    }
}

const HeaderHome = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="navbar-brand" to="/" activeClassName="active">Home</NavLink>
            </li>
        </ul>
    )
};

const HeaderAuth = () => {
    const roleID = window.sessionStorage.getItem('roleID');
    let isAdmin = false;
    let isAuth = false;
    if (roleID === '3') { isAdmin = true; }
    if (roleID) { isAuth = true; }
    if (isAuth) {
        return (
            <ul className="navbar-nav">
                {isAdmin === true ? (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/chef" activeClassName="active">Panel</NavLink>
                    </li>
                ) : (
                    <div/>
                )}
                {roleID === '1' ? (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/chef" activeClassName="active">Panel</NavLink>
                    </li>
                ) : (
                    <div/>
                )}
                {roleID === '2' ? (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/chef" activeClassName="active">Panel</NavLink>
                    </li>
                ) : (
                    <div/>
                )}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signout" activeClassName="active">Log out</NavLink>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signin" activeClassName="active">Sign in</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" activeClassName="active">Sign up</NavLink>
                </li>
            </ul>
        )
    }
};

export default Header;
