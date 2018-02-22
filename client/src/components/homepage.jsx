import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Bloglist from './bloglist';
import Taglist from './tagslist';
import AuthButton from "./auth/authButton"
import UsersList from './userslist';
import * as blogService from '../services/blog';
class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: [],
            tags: [],
            users: [],
        }
    }

    componentDidMount() {
        this.getBlogs();
        this.getTags();
        this.getUsers();
    }

    getBlogs() {
        blogService.all()
            .then((blogs) => {
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getUsers() {
        blogService.allUsers()
            .then((users) => {
                console.log(users);
                let usersArray = [];
                for (let i = 0; i < users.length; i++) {
                    usersArray.push({
                        name: users[i].name,
                        id: users[i].id,
                    });
                }
                this.setState({
                    users: usersArray
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getTags() {
        blogService.allTags()
            .then((tags) => {
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getTagBlog(id) {
        blogService.tagBlog(id)
            .then((blogs) => {
                let blogsArray = [];
                for (let i = 0; i < blogs.length; i++) {
                    blogsArray.push({
                        content: blogs[i].content,
                        id: blogs[i].blogid,
                        title: blogs[i].title,
                        created: blogs[i]._created,
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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <AuthButton />
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tags </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"
                                        onClick={() => { this.getBlogs() }}>Show All</a>
                                    {this.state.tags.map((tag) => {

                                        return (
                                            <Taglist key={tag.id} name={tag.name} id={tag.id} getTagBlog={(id) => { this.getTagBlog(id) }} />
                                        )
                                    })}
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Contributers </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"
                                        onClick={() => { this.getBlogs() }}>Show All</a>
                                    {this.state.users.map((user) => {

                                        return (
                                            <UsersList key={user.id} name={user.name} id={user.id} getUserBlog={(id) => { this.getUserBlog(id) }} />
                                        )
                                    })}
                                </div>

                            </li>



                        </ul>
                    </div>
                </nav>

                <div className="jumbotron">
                    <h1 className="display-4">Sports Blogs!</h1>
                    <p className="lead">Want to feel important???  Write a blog!  Someone, Somewhere may even read it!  Tell your friends, or your cats if you dont have friends.</p>
                    <hr className="my-4" />
                    <p>Get started Now.</p>
                    <p className="lead">
                        <Link to='/create' className="btn btn-primary btn-lg" role="button">Create Blog </Link>
                    </p>
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




