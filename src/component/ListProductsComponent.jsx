import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

import logo from '../images/Nike-spodnie-dresowe.jpg';

import ProductRender from '../function/ProductRender';


const INSTRUCTOR = 'David'

class ListProductsComponent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            type: this.props.match.params.type,
            category: this.props.match.params.category,
            products: [],
            categoryOrType: '',
            message: null,
            pathArray: window.location.pathname.split('/')
            
        }

        
        this.deleteProductClicked = this.deleteProductClicked.bind(this)
        this.updateProductClicked = this.updateProductClicked.bind(this)

        
this.addProductClicked = this.addProductClicked.bind(this)
    }


    componentDidMount(){
        const path = this.state.pathArray[1]

        if(this.state.pathArray[1]==null||this.state.pathArray[1]==""){
            CourseDataService.retrieveAllProducts()
            .then(
                response => {
                    console.log(response);
                    this.setState({categoryOrType: 'All products'})
                    this.setState({products: response.data})
                }
            )
        }
        else if(this.state.pathArray[1]!=null&&this.state.category==null){
            CourseDataService.retrieveAllProductsByType(path)
            .then(
                response => {
                    console.log(response);
                    this.setState({categoryOrType: this.Capitalize(this.state.pathArray[1])})
                    this.setState({products: response.data})
                }
            )
        }
        else {
            CourseDataService.retrieveAllProductsByTypeAndCategoryId(path, this.state.category)
            .then(
                response => {
                    console.log(response);
                    this.setState({categoryOrType: this.Capitalize(this.state.category)})
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


Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

    render() {
        let tables = [];
        ProductRender(this.state.products, tables);

        return (
            <div className="container">
                
        <h3>{this.state.categoryOrType}</h3>
{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">

                        <tbody>
                            
                            {tables}
                                
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

export default ListProductsComponent