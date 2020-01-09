import axios from 'axios';

import Order from './Order';

import React, {
    Component,
} from 'react';

class Orders extends Component {

    constructor () {
        super();
        this.state = {
            orders: [],
            afterLink: ''
        };

        // this.orderHandler = this.orderHandler.bind(this);
    }

    async getOrdersList() {
        const promise = await axios.get('http://localhost:5003/kitchen' + this.props.afterLink);
        const response = promise.data;

        this.setState({
            orders: response,
            afterLink: this.props.afterLink
        });

    }

    async componentDidMount() {
        await this.getOrdersList();
    }

    render(){
        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-12">
                        {this.state.orders != null && this.state.orders.map((order, key) => 
                            <Order
                                key={key}
                                kitchenID={order.kitchenID}
                                productID={order.productID}
                                productReady={order.productReady}
                                dateOfAdmission={order.dateOfAdmission}
                                numberOfProducts={order.numberOfProducts}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
