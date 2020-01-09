import axios from 'axios';

import React, { Component, FormEvent } from 'react';

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            productName: '',
            categoryID: '',
            productPrice: '',
            productURL: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this);
        this.handleChangeProductURL = this.handleChangeProductURL.bind(this);
    }

    async componentDidMount() {
        const promise = await axios.get('/categories');
        const response = promise.data;
        this.setState({categories: response})
    }

    handleChangeProductName(event) {
        this.setState({productName: event.target.value});
    }

    handleChangeProductURL(event) {
        this.setState({productURL: event.target.value});
    }

    handleChangeCategoryID(event) {
        let categoryID = parseInt(event.target.value, 10);
        this.setState({categoryID: categoryID});
    }

    handleChangeProductPrice(event) {
        let productPrice = parseFloat(event.target.value);
        this.setState({productPrice: productPrice});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.productName !== '' &&
            this.state.categoryID !== '' &&
            this.state.productPrice !== '') {
            await axios.post('/products', {
                productName: this.state.productName,
                categoryID: this.state.categoryID,
                productPrice: this.state.productPrice,
                productURL: this.state.productURL
            })
                .then((response) => {
                    this.setState({
                        productName: '',
                        categoryID: '',
                        productPrice: '',
                        productURL: '',
                    });
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {
        return (
            <div className="offset-1 col-lg-9">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Name:</label>
                        <div className="col-sm-8">
                            <input
                                id="productName"
                                className="form-control"
                                placeholder="Name"
                                type="text"
                                value={this.state.productName}
                                onChange={this.handleChangeProductName}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Category:</label>
                        <div className="col-sm-8">
                            <select
                                className="custom-select mr-sm-2"
                                id="categoryID"
                                onChange={this.handleChangeCategoryID}
                            >
                                <option>Choose category</option>
                                {this.state.categories.map((category, index) =>
                                    <option key={index} value={category.categoryID}>
                                        {category.categoryName}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Price:</label>
                        <div className="col-sm-8">
                            <input
                                id="productPrice"
                                className="form-control"
                                placeholder="Price"
                                type="number"
                                step="0.01"
                                value={this.state.productPrice}
                                onChange={this.handleChangeProductPrice}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">URL:</label>
                        <div className="col-sm-8">
                            <input
                                id="productURL"
                                className="form-control"
                                placeholder="URL"
                                type="text"
                                value={this.state.productURL}
                                onChange={this.handleChangeProductURL}
                            />
                        </div>
                        <div className="col-sm-1">
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProduct;
