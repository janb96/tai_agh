import axios from 'axios';
import React, { Component, FormEvent  } from 'react';
import { Link, Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            shouldRedirect: false,
            userRoleID: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (this.state.email !== '' && this.state.password !== '') {
            await axios.post(
                'http://localhost:5005/auth/signin',
                {
                    email: this.state.email,
                    password: this.state.password,
                }
            ).then((promise) => {
                const response = promise.data;
                const token = response['token'];
                const roleID = response['roleID'];
                window.sessionStorage.setItem('token', token);
                window.sessionStorage.setItem('roleID', roleID);

                axios.defaults.headers['Authorization'] = '';
                delete axios.defaults.headers['Authorization'];
                if (token) {
                    axios.defaults.headers['Authorization'] = 'Token ' + token;
                }

                this.setState({
                    shouldRedirect: true,
                    userRoleID: roleID,
                });
            })
            .catch ((error) => {
                console.log(error);
            });
        }
    };

    render() {
        const shouldRedirect = this.state.shouldRedirect;
        const roleID = this.state.userRoleID;
        if (shouldRedirect) {
            if (roleID === 1) {
                return <Redirect to="/chef" />
            } else if (roleID === 2) {
                return <Redirect to="/chef" />
            } else if (roleID === 3) {
                return <Redirect to="/chef" />
            }
        }

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Sign In</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="col-sm-3 col-form-label" htmlFor="email">E-Mail:</label>
                                    <input id="email"
                                           type="email"
                                           className="form-control"
                                           placeholder="Enter your email"
                                           name="email"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-form-label" htmlFor="password">Password</label>
                                    <input id="password"
                                           type="password"
                                           className="form-control"
                                           placeholder="Enter your password"
                                           name="password"
                                           value={this.state.password}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Sign in
                                </button>
                            </form>
                            <hr />
                            <p>Not a member? <Link to="/signup">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
