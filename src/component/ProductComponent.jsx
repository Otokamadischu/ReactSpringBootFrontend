import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

import logo from '../images/Nike-spodnie-dresowe.jpg';

const INSTRUCTOR = 'David'

class ProductComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            type: this.props.match.params.type,
            category: this.props.match.params.category,
            product: null,
            message: null,
            pathArray: window.location.pathname.split('/')
        }

        
        this.deleteProductClicked = this.deleteProductClicked.bind(this)
        this.updateProductClicked = this.updateProductClicked.bind(this)
        
this.addProductClicked = this.addProductClicked.bind(this)
    }


    componentDidMount(){
        const path = this.state.pathArray[1]
        
            CourseDataService.retrieveProduct(path, this.state.category, 1)
            .then(
                response => {
                    console.log(response);
                    this.setState({product: response.data})
                }
            )
        

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
        const { product } = this.state;

        if (product === null) {
          return null;
          
        }


        return (
            <div className="container">
                
        <h3>All Products</h3>
{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    
                {this.state.product.name}
                <img className="image" src={require(`../images/${this.state.product.path}`)} alt="Spodnie" />

                    <div className="row">
    <button className="btn btn-success" onClick={this.addProductClicked}>Add</button>
</div>
                </div>
            </div>
        )
    }
}

export default ProductComponent