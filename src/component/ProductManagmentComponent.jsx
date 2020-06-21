import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

import logo from '../images/Nike-spodnie-dresowe.jpg';

const INSTRUCTOR = 'David'

class ProductManagmentComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            type: this.props.match.params.type,
            category: this.props.match.params.category,
            product: null,
            message: null,
            pathArray: window.location.pathname.split('/')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)


    }


    componentDidMount(){
        
            CourseDataService.retrieveProduct(this.state.type, this.state.category, this.state.pathArray[4])
            .then(
                response => {
                    console.log(response);
                    this.setState({product: response.data})
                }
            )
    }

    deleteProduct(id) {
        const type = this.state.pathArray[1]
        const category = this.state.pathArray[2]

        CourseDataService.deleteProduct(type, category, id)
            .then(
                response => {
                    this.setState({ message: `Delete of product ${id} successful` })
                    this.props.history.push('/'+type+'/'+category)
                }
            )
    }

onSubmit(values) {
    
    let product = {
        productId: this.state.product.productId,
        description: values.description,
        name: values.name,
        path: 'Nike-spodnie-dresowe.jpg',
        
        price: 10,
        quantity: 10,
        size: 10,
        categoryId: 1
        
    }
    const type = this.state.pathArray[1]
    const category = this.state.pathArray[2]
    if (this.state.id === -1) {
        CourseDataService.createProduct("kobiety", "category", product)
            .then(() => this.props.history.push('/kobiety/category'))
    } else {
        CourseDataService.updateProduct(type, category, product)
            .then(() => this.props.history.push('/'+type+'/'+category))
    }
    
    console.log(values);
}

validate(values) {
let errors = {}
if (!values.description) {
    errors.description = 'Enter a Description'
} else if (values.description.length < 5) {
    errors.description = 'Enter atleast 5 Characters in Description'
}
return errors
}


    render() {
        const { product } = this.state;
        

        if (product === null) {
            return null;
            
          }

        let {name, productId, description} =  this.state.product

        return (
            <div className="container">
                
        <h3>All Products</h3>
{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="productForm">
                   
                <div className="center">
                    <img className="image" src={require(`../images/${this.state.product.path}`)} alt="Spodnie" />
                </div>

                <Formik
                        initialValues={{ name,productId,description}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="productId" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    
                                    <div className="center">
                                    <button className="btn btn-info" type="submit">Save</button>
                                    </div>
                                    
                                </Form>
                            )
                        }
                    </Formik>


                    <div className="centerPadding">
                        
                        <button className="btn btn-danger" onClick={() => this.deleteProduct(this.state.product.productId)}>Delete</button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductManagmentComponent