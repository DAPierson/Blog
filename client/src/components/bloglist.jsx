import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Bloglist extends Component {

    render() {
        return (
            <Fragment>

                <div className="card" >
                    <div className="card-body">
                        <Link to={`/${this.props.id}`}>  <h5 className="card-title">{this.props.title}</h5></Link>
                        <p className="card-text">{this.props.content}</p>
                        <p className="card-text"><small className="text-muted">Created - {this.props.created}</small></p>
                    </div>
                </div>


            </Fragment>
        );
    }
}

export default Bloglist;






