// import axios from 'axios';

import React, {
    Component,
} from 'react';
import axios from "axios";

class Product extends Component {

    constructor (props) {
        super(props);
        this.state = {
            number: 1,
            isAdmin: false,
            isAuth: false,
            editMode: false,
            productName: props.productName,
            productPrice: props.productPrice,
            productStatus: props.productStatus,
            productURL: props.productURL,
            chef: this.props.chef
        };
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleEditMode = this.handleEditMode.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this);
        this.handleChangeProductURL = this.handleChangeProductURL.bind(this);
        this.handleChangeProductStatus = this.handleChangeProductStatus.bind(this);
    }

    async componentDidMount() {
        const roleID = window.sessionStorage.getItem('roleID');
        if (roleID === '3') {
            this.setState({isAdmin: true});
        }
        if (roleID) {
            this.setState({isAuth: true});
        }
    }

    handleUp() {
        let value = this.state.number;
        value = value + 1;

        this.setState({number: value});
    }

    handleDown() {
        let value = this.state.number;
        if(value > 1){
            value = value - 1;
        }
        this.setState({number: value});
    }

    handleEditMode () {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    handleChangeProductName(event) {
        this.setState({productName: event.target.value});
    }

    handleChangeProductURL(event) {
        this.setState({productURL: event.target.value});
    }

    handleChangeProductPrice(event) {
        let productPrice = parseFloat(event.target.value);
        this.setState({productPrice: productPrice});
    }

    handleChangeProductStatus(event) {
        let productStatus = event.target.value;
        this.setState({productStatus: productStatus});
    }

    async handleEdit() {
        if(this.state.productName !== '' &&
            this.state.productPrice !== '') {
            await axios.put('/products',{
                productID: this.props.productID,
                productName: this.state.productName,
                categoryID: this.props.categoryID,
                productPrice: this.state.productPrice,
                productStatus: this.state.productStatus,
                productURL: this.state.productURL,
            }).then(() => {
                this.setState({
                    editMode: false,
                });
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        const editMode = this.state.editMode;
        const isAdmin = this.state.isAdmin;
        const isAuth = this.state.isAuth;

        let photo;

        try{
            const images = require.context("./../../photo", true);
            photo = images('./' + this.props.productURL);
        } catch (e) {
            console.log(e);
        }
        let orderHandler = this.props.orderHandler;
        if (this.state.chef === "chef") {

            return (
                <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <p><strong>Nazwa:</strong> {this.props.productName} <strong>ProductID:</strong> {this.props.productID}</p>
                            </div>
                        </div>
                </div>
            );
                
        } else {
            return (
                <div className="container">
                    <div className="alert alert-secondary">
                        <div className="row">
                            <div className="col-3">
                                <h2><strong>{this.props.productName}</strong></h2>
                            </div>
                            <div className="col-3">
                                <h2><kbd>{this.props.productPrice} zł</kbd></h2>
                            </div>
                            <div className="col-3">
                                <img src={photo} className="img-fluid" alt={this.props.productName}/>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-danger btn-block" onClick={this.handleDown}>-</button>
                            </div>
                            <div className="col-1">
                                <h2>{this.state.number}</h2>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-success btn-block" onClick={this.handleUp}>+</button>
                            </div>
                        </div>
                        <br/>
                        <button
                            className="btn btn-success btn-block"
                            onClick={() => orderHandler(
                                this.props.productID,
                                this.props.productPrice,
                                this.state.number,
                                this.props.productName)
                            }>Add to order</button>
                    </div>
                </div>
            );
        }
    }


}

export default Product;
