import axios from 'axios';
import React, { Component, FormEvent  } from 'react';
import { Link, Redirect } from 'react-router-dom';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            firstName: '',
            surName: '',
            roleID: '',
            roles: [],
            email: '',
            password: '',
            shouldRedirect: false,
            userRoleID: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangeRole(event) {
        let roleID = parseInt(event.target.value, 10);
        this.setState({roleID: roleID});
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (this.state.email !== '' && this.state.userName !== '' && this.state.password !== '') {
            await axios.post(
                'http://localhost:5005/auth/signup',
                {
                    userName: this.state.userName,
                    firstName: this.state.firstName,
                    surName: this.state.surName,
                    roleID: this.state.roleID,
                    email: this.state.email,
                    password: this.state.password,
                }
            ).then((promise) => {
                const response = promise.data;
                const token = response['token'];
                const userRoleID = response['roleID'];
                window.sessionStorage.setItem('token', token);
                window.sessionStorage.setItem('roleID', userRoleID);

                axios.defaults.headers['Authorization'] = '';
                delete axios.defaults.headers['Authorization'];
                if (token) {
                    axios.defaults.headers['Authorization'] = 'Token ' + token;
                }

                this.setState({
                    shouldRedirect: true,
                    userRoleID: userRoleID
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    async componentDidMount() {
        const promise = await axios.get('http://localhost:5005/roles');
        const response = promise.data;
        this.setState({roles: response});
    }

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
                            <h1 className="text-center">Sign Up</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="col-sm-3 col-form-label" htmlFor="userName">Username:</label>
                                    <input id="userName"
                                           type="userName"
                                           className="form-control"
                                           placeholder="Enter your username"
                                           name="userName"
                                           value={this.state.userName}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-form-label" htmlFor="firstName">Firstname:</label>
                                    <input id="firstName"
                                           type="firstName"
                                           className="form-control"
                                           placeholder="Enter your firstame"
                                           name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-form-label" htmlFor="surName">Surname:</label>
                                    <input id="surName"
                                           type="surName"
                                           className="form-control"
                                           placeholder="Enter your surname"
                                           name="surName"
                                           value={this.state.surName}
                                           onChange={this.handleChange}
                                    />
                                </div>
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
                                    <label className="col-sm-3 col-form-label">Role:</label>
                                    <div className="col-sm-9">
                                        <select
                                            className="custom-select mr-sm-2"
                                            id="roleID"
                                            onChange={this.handleChangeRole}
                                        >
                                            <option>Choose role</option>
                                            {this.state.roles.map((roles, index) =>
                                                <option key={index} value={roles.roleID}>
                                                    {roles.roleName}
                                                </option>
                                            )}
                                        </select>
                                    </div>
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
                                <div>
                                    <button type="submit" className="btn btn-success">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <hr />
                            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
