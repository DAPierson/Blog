import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './homepage';
import CreateBlog from './createblog';
import SingleBlog from "./singleblog";

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                   
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path='/create' component ={CreateBlog}   />
                        <Route exact path='/:id' component ={SingleBlog}  />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;