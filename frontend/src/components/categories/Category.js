import axios from 'axios';
import React, { Component } from 'react';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            editMode: false,
            categoryID: props.category.categoryID,
            categoryName: props.category.categoryName,
        };
        this.handleEditMode = this.handleEditMode.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
    }

    async componentDidMount() {
        const roleID = window.sessionStorage.getItem('roleID');
        if (roleID === '3') {
            this.setState({isAdmin: true});
        }
    }

    handleEditMode () {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    handleChangeCategoryName(event) {
        this.setState({categoryName: event.target.value});
    }

    async handleEdit() {
        if(this.state.categoryName !== '') {
            await axios.put('/categories',{
                categoryID: this.state.categoryID,
                categoryName: this.state.categoryName
            }).then(() => {
                this.setState({
                    editMode: false,
                });
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render() {
        const isAdmin = this.state.isAdmin;
        const editMode = this.state.editMode;
        const categoryName = this.state.categoryName;

        if (isAdmin) {
            if (editMode) {
                return (
                    <div className="container">
                        <div className="alert alert-secondary">
                            <div className="col-10">
                                <label htmlFor="categoryName">Category name:</label>
                                <input type="text" className="form-control" id="categoryName" value={this.state.categoryName}
                                       onChange={this.handleChangeCategoryName} />
                            </div>
                            <br/>
                            <button className='btn btn-warning btn-block' onClick={this.handleEdit}>Edit category</button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <div className="alert alert-secondary">
                            <div className="row">
                                <div className="col-8">
                                    {categoryName}
                                </div>
                                <div className="col-4">
                                    <div
                                        className='btn btn-warning btn-lg'
                                        onClick={this.handleEditMode}
                                    >
                                        Edit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="container"
                    onClick={() => this.props.setCategory(this.props.category)}
                >

                    <button className="m-2 col-12 btn-lg btn-light">
                        <div className="col-12">
                            {categoryName}
                        </div>
                    </button>
                </div>
            );
        }
    }
}

export default Category;
