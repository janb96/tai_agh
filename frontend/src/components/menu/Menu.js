import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Products from "../products/Products";
import Categories from "../categories/Categories";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            displayCategoryID: '',
            tableNumber: null,
            additionalCategory: {'categoryID': 0, 'categoryName': 'All'},
        };
        this.setCategory = this.setCategory.bind(this);
    }

    async componentDidMount() {
        const tableNumber = window.sessionStorage.getItem('tableNumber');

        this.setState({
            tableNumber: tableNumber,
        });
    }

    setCategory(category) {
        let categoryID = category.categoryID;
        if (categoryID === 0) {
            categoryID = '';
        }
        this.setState({displayCategoryID: categoryID});
    }

    render() {
        const tableNumber = this.state.tableNumber;
        const displayCategoryID = this.state.displayCategoryID;
        const additionalCategory = this.state.additionalCategory;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Categories setCategory={this.setCategory} additionalCategory={additionalCategory}/>
                    </div>
                    <div className="col-9">
                        <Products afterLink={"/" + displayCategoryID} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
