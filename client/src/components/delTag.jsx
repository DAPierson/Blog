
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class DelTag extends Component {


delTag(blog,tag){
    console.log(blog,tag);
    this.props.delTag(blog,tag);
    
}


    render() {
        return (
            <Fragment>

<a className="dropdown-item" 
onClick={() => { this.delTag(this.props.blogid,this.props.id) }}>{this.props.name}</a>


            </Fragment>
        );
    }
}

export default DelTag;
