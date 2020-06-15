import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

import logo from '../images/Nike-spodnie-dresowe.jpg';

const INSTRUCTOR = 'David'

class ListProductsManagmentComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            type: this.props.match.params.type,
            category: this.props.match.params.category,
            products: [],
            message: null,
            pathArray: window.location.pathname.split('/')
        }

        
        this.deleteProductClicked = this.deleteProductClicked.bind(this)
        this.updateProductClicked = this.updateProductClicked.bind(this)
        
this.addProductClicked = this.addProductClicked.bind(this)
    }


    componentDidMount(){

        if(this.state.type==null){
            CourseDataService.retrieveAllManagmentProducts()
            .then(
                response => {
                    console.log(response);
                    this.setState({products: response.data})
                }
            )
        }
        else if(this.state.type!=null&&this.state.category==null){
            CourseDataService.retrieveAllManagmentProductsByType(this.state.type)
            .then(
                response => {
                    console.log(response);
                    this.setState({products: response.data})
                }
            )
        }
        else {
            CourseDataService.retrieveAllManagmentProductsByTypeAndCategoryId(this.state.type, this.state.category)
            .then(
                response => {
                    console.log(response);
                    this.setState({products: response.data})
                }
            )
        }

    }


    
deleteProductClicked(id) {
    CourseDataService.deleteCourse(INSTRUCTOR, id)
        .then(
            response => {
                this.setState({ message: `Delete of course ${id} Successful` })
                this.refreshCourses()
            }
        )
}


updateProductClicked(id) {
    console.log('update ' + id)
    this.props.history.push(`/courses/${id}`)
}


addProductClicked() {
    this.props.history.push(`/courses/-1`)
}

    render() {
        return (
            <div className="container">
                
<h3>All Products</h3>
{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <tr key={product.productId}>
                                            <td>{product.productId}</td>
                                            <td>{product.path}</td>
                                            <td><img className="image" src={require(`../images/${product.path}`)} alt="Spodnie" /></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(product.id)}>Delete</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateCourseClicked(product.id)}>Update</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
    <button className="btn btn-success" onClick={this.addProductClicked}>Add</button>
</div>
                </div>
            </div>
        )
    }
}

export default ListProductsManagmentComponent