import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirectLogin: false,
        };
    }

    async componentDidMount() {
        try {
            sessionStorage.clear();
            let test = await axios.get('http://localhost:5005/auth/signout');
            delete axios.defaults.headers['Authorization'];
            this.setState({
                shouldRedirectLogin: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const shouldRedirectLogin = this.state.shouldRedirectLogin;

        if (shouldRedirectLogin) {
            return <Redirect to='/'/>;
        }

        return <div>Loading...</div>;
    }

}

export default SignOut;
