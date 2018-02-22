import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class UsersList extends Component {


// userBlog(id){
//     console.log(id);
//     this.props.getTagBlog(id);
// }


    render() {
        return (
            <Fragment>

<a className="dropdown-item" >{this.props.name}</a>


            </Fragment>
        );
    }
}

export default UsersList;
