  
import React, { Component } from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CourseComponent from './CourseComponent';
import ListProductsManagmentComponent from './ListProductsManagmentComponent';
import ListProductsComponent from './ListProductsComponent';
import ProductComponent from './ProductComponent';
class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 class="text-blue">Gym Nova</h1>
                    <Switch>
                        
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                        
                        <Route path="/" exact component={ListProductsComponent}/>
                        <Route path="/(kobiety|mezczyzni|suplementy)" exact component={ListProductsComponent}/>
                        <Route path="/(kobiety|mezczyzni|suplementy)/:category" exact component={ListProductsComponent}/>
                        <Route path="/(kobiety|mezczyzni|suplementy)/:category/:id" exact component={ProductComponent}/>



                        <Route path="/managment" exact component={ListProductsManagmentComponent}/>
                        <Route path="/managment/:type" exact component={ListProductsManagmentComponent}/>
                        <Route path="/managment/:type/:category" exact component={ListProductsManagmentComponent}/>

                        
                    </Switch>
                </>
            </Router>
        )
    }
}
export default InstructorApp