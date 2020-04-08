  
import React, { Component } from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CourseComponent from './CourseComponent';
import ListProductsManagmentComponent from './ListProductsManagmentComponent';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 class="text-blue">Shop Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListProductsManagmentComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                        

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