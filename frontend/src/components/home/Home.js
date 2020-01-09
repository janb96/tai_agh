import React, { Component } from 'react';

import {Link} from "react-router-dom";

class Home extends Component {

    render() {
        let photo1;
        let photo2;
        try{
            photo1 = require("../../photo/restaurant.jpg");
            photo2 = require("../../photo/sign_in.jpg");
        } catch (e) {
            console.log(e);
        }
        return (
            <div className="container">
                <br/>
                <h1 className="display-1 text-center">Resto<kbd>Manager</kbd></h1>
                <br/>
                <br/>
                <div className="row text-center">
                    <div className="col-6">

                            <Link to="/menu">
                                <h2>Guest</h2>
                                <img src={photo1} className="img-fluid" alt="Choose your table"/>
                            </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/chef">
                            <h2>Chef in</h2>
                            <img src={photo2} className="img-fluid" alt="Sign in"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
