import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Bloglist from './bloglist';
class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
        }
    }
    componentDidMount() {
        this.getBlogs()
    }

    getBlogs() {
        fetch('/api/Blogs/')
            .then((response) => {
                return response.json();
            }).then((blogs) => {

                let blogsArray = [];
                for (let i = 0; i < blogs.length; i++) {

                    blogsArray.push({
                        content: blogs[i].content,
                        id: blogs[i].id,
                        title: blogs[i].title,
                    });
                }
                this.setState({
                    blogs: blogsArray


                });
                
            })


            .catch((err) => {
                console.log(err);
            });
    }




    render() {
        return (
            <React.Fragment>
                <div className="jumbotron">
                    <h1 className="display-4">BLOG HERE!</h1>
                    <p className="lead">Want to feel important???  Write a blog!  Someone somewhere may even read it!  Tell your friends, or your cats if you dont have friends.</p>
                    <hr className="my-4" />
                    <p>Get started Now.</p>
                    <p className="lead">
                        <Link to='/create' className="btn btn-primary btn-lg" href="#" role="button">Create Blog </Link>
                    </p>
                </div>
                {this.state.blogs.map((blog) => {
                    return (
                        <Bloglist key={blog.id} content={blog.content} title={blog.title} id ={blog.id}/>
                    );
                })}
                </React.Fragment>

        );
    }
}

export default HomePage;




