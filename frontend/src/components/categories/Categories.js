import axios from 'axios';

import React, { Component } from 'react';
import Category from "./Category";

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            isAdmin: false,
            categoryName: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
    }

    async getCategoriesList() {
        const promise = await axios.get('/categories');
        const response = promise.data;
        if (this.props.additionalCategory) {
            this.setState({categories: [...response, this.props.additionalCategory]});
        } else {
            this.setState({categories: response})
        }
    }

    async componentDidMount() {
        const roleID = window.sessionStorage.getItem('roleID');
        if (roleID === '3') {
            this.setState({isAdmin: true});
        }
        await this.getCategoriesList();
    }

    handleChangeCategoryName(event) {
        this.setState({categoryName: event.target.value});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.categoryName !== '') {
            await axios.post('/categories', {
                categoryName: this.state.categoryName
            })
                .then((response) => {
                    this.setState({categoryName: ''});
                    this.getCategoriesList();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <h3>Choose category</h3>
                </div>
                {isAdmin ? (
                    <div className="offset-1 col-lg-6">
                        <p className="text-center">Add new category</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Name:</label>
                                <div className="col-sm-7">
                                    <input
                                        id="categoryName"
                                        className="form-control"
                                        placeholder="Name"
                                        value={this.state.categoryName}
                                        onChange={this.handleChangeCategoryName}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button type="submit" className="btn btn-success btn-lg">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        <hr />
                    </div>
                ) : (<div></div>)}
                <div className="row">
                    <div className="col-12">
                        {this.state.categories.map((category, key) => (
                            <Category
                                key={key}
                                category={category}
                                setCategory={this.props.setCategory}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;
