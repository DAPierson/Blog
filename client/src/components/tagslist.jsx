import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Taglist extends Component {


tagBlog(id){
    console.log(id);
    this.props.getTagBlog(id);
}


    render() {
        return (
            <Fragment>

<a className="dropdown-item" 
onClick={() => { this.tagBlog(this.props.id) }}>{this.props.name}</a>


            </Fragment>
        );
    }
}

export default Taglist;
