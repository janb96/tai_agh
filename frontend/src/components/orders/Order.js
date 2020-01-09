import axios from 'axios';

import React, {
    Component,
} from 'react';

class Order extends Component {

    constructor () {
        super();
        this.state = {
            kitchenID: '',
            productReady: '',
            dateOfAdmission: '',
            numberOfProducts: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(status) {
        let value = status.target.value;
        console.log(value);

        axios.put("http://localhost:5003/kitchen" , {
            kitchenID: this.state.kitchenID,
            productReady: value
        }).then(result => {
            this.setState({
                productReady: value
            });
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        });
    }

    async componentDidMount() {
        this.setState({
            kitchenID: this.props.kitchenID,
            productReady: this.props.productReady,
            dateOfAdmission: this.props.dateOfAdmission,
            productID: this.props.productID,
            numberOfProducts: this.props.numberOfProducts
        });
    }

    render(){
        let alertColor;
        if(this.state.productReady == 1){
            alertColor="alert alert-success";
        } else if(this.state.productReady == 2){
            alertColor="alert alert-warning";
        } else if(this.state.productReady == 3){
            alertColor="alert alert-info";
        }

        return (
            <div className="container">
                <div className={alertColor}>
                    <h2><strong>kitchenID:</strong> {this.state.kitchenID}</h2>
                    <p><strong>Status:</strong>{this.state.productReady}</p>
                    <div className="row">
                        <div className="col-6">
                            <p><strong>Order date:</strong></p>
                            <p>{this.state.dateOfAdmission}</p>
                            <p><strong>ProductID:</strong></p>
                            <p>{this.state.productID}</p>
                            <p><strong>Number of products:</strong></p>
                            <p>{this.state.numberOfProducts}</p>
                        </div>
                        <div className="col-6">
                            <div className="btn-group-vertical">
                                <button className="btn btn-success" value="1" onClick={this.handleClick}>OPEN</button>
                                <button className="btn btn-warning" value="2" onClick={this.handleClick}>DONE</button>
                                <button className="btn btn-primary" value="3" onClick={this.handleClick}>DELIVERED</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Order;
