import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Bloglist from './bloglist';
import Taglist from './tagslist';
class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            tags: [],
        }
    }
    
    componentDidMount() {
        this.getBlogs();
        this.getTags();
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
                        created: blogs[i]._created,
                    });
                }
                this.setState({
                    blogs: blogsArray
                });
                console.log(this.state.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getTags() {
        fetch('/api/Tags/')
            .then((response) => {
                return response.json();
            }).then((tags) => {
                let tagsArray = [];
                for (let i = 0; i < tags.length; i++) {

                    tagsArray.push({
                        name: tags[i].name,
                        id: tags[i].id,

                    });
                }
                this.setState({
                    tags: tagsArray

                });
                console.log(this.state.tags);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getTagBlog(id) {
        console.log(id)
        fetch(`/api/blogs/tag/${id}`)
            .then((response) => {
                console.log(response);
                return response.json();
                
            }).then((blogs) => {

                let blogsArray = [];
                for (let i = 0; i < blogs.length; i++) {

                    blogsArray.push({
                        content: blogs[i].content,
                        id: blogs[i].id,
                        title: blogs[i].title,
                        created: blogs[i]._created,
                    });
                }
                this.setState({
                    blogs: blogsArray
                });
                console.log(this.state.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className="jumbotron">
                    <h1 className="display-4">Sports Blogs!</h1>
                    <p className="lead">Want to feel important???  Write a blog!  Someone, Somewhere may even read it!  Tell your friends, or your cats if you dont have friends.</p>
                    <hr className="my-4" />
                    <p>Get started Now.</p>
                    <p className="lead">
                        <Link to='/create' className="btn btn-primary btn-lg"  role="button">Create Blog </Link>
                    </p>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Blog Tags
  </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" 
                        onClick={() => { this.getBlogs() }}>Show All</a>
                        {this.state.tags.map((tag) => {

                            return (
                                <Taglist key={tag.id} name={tag.name} id={tag.id} getTagBlog={(id) => { this.getTagBlog(id) }} />
                            )
                        })}
                    </div>
                </div>
                <div className="card-deck">
                    {this.state.blogs.map((blog) => {
                        return (
                            <Bloglist key={blog.id} content={blog.content} title={blog.title} id={blog.id} created={blog.created} />
                        );
                    })}
                </div>
            </React.Fragment>

        );
    }
}

export default HomePage;




