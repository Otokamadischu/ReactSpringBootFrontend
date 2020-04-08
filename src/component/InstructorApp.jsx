  
import React, { Component } from 'react';
import ListCoursesComponent from './ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CourseComponent from './CourseComponent';
import ListProductsComponent from './ListProductsComponent';

class InstructorApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 class="text-blue">Shop Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListCoursesComponent} />
                        <Route path="/courses" exact component={ListCoursesComponent} />
                        <Route path="/courses/:id" component={CourseComponent} />
                        <Route path="/:type" exact component={ListCoursesComponent} />

                        <Route path="/:type/:category" exact component={ListProductsComponent}/>
                    </Switch>
                </>
            </Router>
        )
    }
}
export default InstructorApp