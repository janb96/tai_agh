import axios from 'axios';

import Product from './Product';

import React, {
    Component,
} from 'react';
import AddProduct from "./AddProduct";

function MyOrder(props) {
    let handleClick = props.handleClick;
    let color;
    if(props.postResponse !== "Order created"){
        color = "alert alert-info";
    } else {
        color = "alert alert-success"
    }
    if(props.orders.length > 0){
        let totalPrice = 0;
        for(let i = 0; i < props.orders.length; i++){
            totalPrice = totalPrice + (props.orders[i].number * props.orders[i].productPrice);
        }
        const myOrder = props.orders.map((product) =>
            <div>
                <p><kbd>{product.productName}</kbd> <strong>Quantity:</strong>{product.number} <strong>Price(pc.):</strong>{product.productPrice} zł</p>
            </div>
        );
        return <div className={color}>
            <h3><strong>Your order</strong></h3>
            {myOrder}
            <h3><strong>Total price:</strong> {totalPrice} zł</h3>
            <button onClick={() => handleClick(totalPrice)}>Make order</button>
            <br/>
            <h2>{props.postResponse}</h2>
        </div>;
    } else {
        return <div></div>
    }
}

class Products extends Component {

    constructor () {
        super();
        this.state = {
            chef: '',
            products: [],
            afterLink: '',
            order: '',
            tableNumber: null,
            orders: [],
            postResponse: "",
            orderID: 0,
            isAdmin: false,
        };

        this.orderHandler = this.orderHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getProductsList() {
        const promise = await axios.get('http://localhost:4000/products' + this.props.afterLink);
        const response = promise.data;

        this.setState({
            chef: this.props.chef,
            products: response,
            afterLink: this.props.afterLink,
        });

    }

    async componentDidMount() {
        const roleID = window.sessionStorage.getItem('roleID');
        if (roleID === '3') {
            this.setState({isAdmin: true});
        }
        const tableNumber = window.sessionStorage.getItem('tableNumber');
        this.setState({
            tableNumber: tableNumber,
        });
        await this.getProductsList();
    }

    async componentDidUpdate() {
        if (this.state.afterLink !== this.props.afterLink) {
            await this.getProductsList();
        }
    }

     async handleClick(price) {

        const date = new Date();
        const tableID = this.state.tableNumber;


        //TUTAJ DODAC ORDER
        // let response = await axios.post("http://localhost:5000/orders" , {
        //     orderStatus: "OPEN",
        //     orderPrice: price,
        //     tableID: tableID
        // });

        //  this.setState({
        //      postResponse: "Order created",
        //      orderID: response.data.orderID
        //  });
        for(let i = 0; i < this.state.orders.length; i++){
            axios.post("http://localhost:5003/kitchen" , {
                productID: this.state.orders[i].productID,
                numberOfProducts: this.state.orders[i].number,
            });
        }
    }

    orderHandler(productID, productPrice, number, productName) {
        const productObject = new ProductData(productID, productPrice, number, productName);
        let orders = this.state.orders;
        const indexWithProduct = orders.findIndex(item => item.productID === productID);
        if (indexWithProduct >= 0) {
            orders.splice(indexWithProduct, 1);
        }
        if (number > 0) {
            orders.push(productObject);
        }
        this.setState({orders: orders});
    }

    render(){
        const isAdmin = this.state.isAdmin;
        return (
            <div className="container">
                {isAdmin ? (
                    <AddProduct/>
                ) : (<div></div>)
                }
                <MyOrder orders={this.state.orders} handleClick={this.handleClick} postResponse={this.state.postResponse}/>
                <div className="row">
                    <div className="col-12">
                        {this.state.products != null && this.state.products.map((product, key) =>
                            <Product
                                key={key}
                                productID={product.productID}
                                categoryID={product.categoryID}
                                productName={product.productName}
                                productPrice={product.productPrice}
                                productStatus={product.productStatus}
                                productURL={product.productURL}
                                orderHandler={this.orderHandler}
                                chef={this.state.chef}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

class ProductData {
    constructor(productID, productPrice, number, productName) {
        this.productID = productID;
        this.productPrice = productPrice;
        this.number = number;
        this.productName = productName;
    };
}

export default Products;
