import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link,  } from 'react-router-dom';
import HomePage from './homepage';
import CreateBlog from './createblog';
import SingleBlog from "./singleblog";
import EditBlog from "./editblog";
import Login from "./auth/login";
import Logout from "./auth/logout";
import PrivateRoute from "./auth/privateRoute"
class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                   
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path='/create' component ={CreateBlog}   />
                        <Route exact path='/login' component ={Login}  />
                        <Route exact path='/logout' component ={Logout}  />
                        <Route exact path='/:id' component ={SingleBlog}  />
                        <PrivateRoute exact path='/:id/edit' component ={EditBlog} />
                        
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;