import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class AddTag extends Component {


setTag(blog,tag){
    this.props.addTag(blog,tag);
}


    render() {
        return (
            <Fragment>

<a className="dropdown-item" 
onClick={() => { this.setTag(this.props.blogid,this.props.id) }}>{this.props.name}</a>


            </Fragment>
        );
    }
}

export default AddTag;
