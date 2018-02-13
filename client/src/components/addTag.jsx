import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class AddTag extends Component {





    render() {
        return (
            <Fragment>

<a className="dropdown-item" >{this.props.name}</a>


            </Fragment>
        );
    }
}

export default AddTag;
