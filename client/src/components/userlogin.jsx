import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

class UserLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {};

    }

    home(){
        this.props.history.goBack();
    }
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Blogs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#"
                                    onClick={(ev) => { this.home(ev) }}
                                >Home <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1> Please Login</h1>
                <input type="email" placeholder="Email"
                 onChange={(event) => { this.handleEmailChange(event.target.value) }} />/>
                <input type="text" placeholder="Password"
                 onChange={(event) => { this.handlePasswordChange(event.target.value) }} />/>
                <button
                onClick={() => { this.userLogin(this.state) }}>Login</button>
            </Fragment>
        );
    }
}

export default UserLogin;
