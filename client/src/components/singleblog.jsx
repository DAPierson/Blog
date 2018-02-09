
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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
    deleteBlog(id) {
        fetch(`/api/Blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
            this.props.history.goBack();
        }).catch((err) => {
            console.log(err);
        });
    }
    home(ev){
        this.props.history.goBack();
    };


    render() {
        return (
            <Fragment>
                <h1> {this.state.blog.title}</h1>
                <p> {this.state.blog.content}</p>
                <button
                onClick={() => { this.deleteBlog(this.props.match.params.id) }}>Delete</button>
               <Link to={`/${this.props.match.params.id}/edit`}> <button>Edit</button> </Link>
                <button
                onClick={(ev) => { this.home(ev) }}>Home</button>

            </Fragment>
        );
    }
}

export default SingleBlog;
