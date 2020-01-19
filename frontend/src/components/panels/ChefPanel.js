import React, { Component } from 'react';

import Orders from "../orders/Orders";

import { Redirect } from 'react-router-dom';
import Products from "../products/Products";
import Header from '../header/Header';

class ChefPanel extends Component {

    constructor () {
        super();
        this.state = {
            panelManager: "",
            isLogin: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;

        this.setState({
            panelManager: value
        });
    }

    handleReload(){
        window.location.reload();
    }

    tick() {
        window.location.reload();
    }

    componentDidMount(){
        const roleID = window.sessionStorage.getItem('roleID');
        console.log(roleID);
        if (roleID !== '1') {
            this.setState({isLogin: false});
        }
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    render() {

        const isLogin = this.state.isLogin;
        if (!isLogin) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <Header/>
                <div className="container text-center">
                    <br/>
                    <h1>Chef <span className="badge badge-secondary">Panel</span></h1>
                    <br/>
                    <button className="btn btn-outline-info" onClick={this.handleReload}>Refresh</button>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h2 className="text-center">NEW</h2>
                        <Orders afterLink="/toDo"/>
                    </div>
                    <div className="col-3">
                        <h2 className="text-center">Done</h2>
                        <Orders afterLink="/forRelease"/>
                    </div>
                    <div className="col-3">
                        <h2 className="text-center">Delivered</h2>
                        <Orders afterLink="/received"/>
                    </div>
                    <div className="col-3">
                         <div className="row">
                            <Products afterLink={"/"} chef={"chef"}/>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default ChefPanel;
