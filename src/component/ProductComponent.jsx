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
    }


    componentDidMount(){
        
            CourseDataService.retrieveProduct(this.state.pathArray[1], this.state.category, this.state.pathArray[3])
            .then(
                response => {
                    console.log(response);
                    this.setState({product: response.data})
                }
            )
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

                <div className="product">
                    
                    <br></br>
                    <img className="image2" src={require(`../images/${this.state.product.path}`)} alt="Spodnie" />
                    <br></br>{this.state.product.name}
                    <br></br><br></br><div className="textPrice">{product.price} zł</div>
                </div>
            </div>
        )
    }
}

export default ProductComponent