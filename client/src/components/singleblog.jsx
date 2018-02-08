
import React, { Component, Fragment } from 'react';
import { Link } from 'react-dom';

class SingleBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blog: []
        }
    }



    componentDidMount() {
        this.getBlog(this.props.match.params.id)
    }
    getBlog(id) {
        fetch(`/api/blogs/${id}`)
            .then((response) => {
                return response.json();
            }).then((blog) => {
                this.setState({ blog });
                console.log(this.state.blog.title);
            }).catch((err) => {
                console.log(err);
            });
    };


    render() {
        return (
            <Fragment>
                <h1> {this.state.blog.title}</h1>
                <p> {this.state.blog.content}</p>
            </Fragment>
        );
    }
}

export default SingleBlog;
