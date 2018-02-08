import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Bloglist extends Component {

    render() {
        return (
            <Fragment>
              <Link to={`/${this.props.id}`}>   <p>{this.props.title}</p></Link>
                <p>{this.props.content}</p>
              
           
    
            </Fragment>
        );
    }
}

export default Bloglist;






