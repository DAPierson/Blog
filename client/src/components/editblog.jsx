import React, { Component, Fragment } from 'react';
import { Link } from 'react-dom';
import AddTag from './addtag';
import DelTag from './deltag';

class EditBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alltags: [],
            blog: [],
            tags: [],
            title: "",
            content: "",
        }
    }



    componentDidMount() {
        this.getBlog(this.props.match.params.id)
        this.getBlogTag(this.props.match.params.id)
        this.getTags()
    }

    setTag(blog, tag) {
        fetch('/api/Blogs/addtag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blog,
                tag,
            })
        }).then(() => {
            alert('Tag added!')
        }).catch((err) => {
            console.log(err);
        });
    }
    delTag(bid, tid) {
        fetch(`/api/Blogs/deltag/${bid}/${tid}`, {
            method: 'DELETE',
        }).then(() => {
            alert('Tag Removed!')
        }).catch((err) => {
            console.log(err);
        });
    }
    deleteBlog(id) {
        fetch(`/api/Blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    getBlogTag(id) {
        console.log(id)
        fetch(`/api/blogs/blog/${id}`)
            .then((response) => {
                console.log(response);
                return response.json();

            }).then((tags) => {

                let tagsArray = [];
                for (let i = 0; i < tags.length; i++) {

                    tagsArray.push({

                        id: tags[i].id,
                        title: tags[i].name,

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
    getBlog(id) {
        fetch(`/api/blogs/${id}`)
            .then((response) => {
                return response.json();
            }).then((blog) => {
                this.setState({ blog });
                console.log(this.state.blog.title);
            }).catch((err) => {

            });
    };
    editBlog(id, values) {
        fetch(`/api/Blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,
            })
        }).then(() => {
            this.props.history.push('/');
        }).catch((err) => {
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
                    alltags: tagsArray

                });
                console.log(this.state.tags);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    home(ev) {
        this.props.history.push('/');
    };

    back(ev) {
        this.props.history.goBack();
    };
    handleTitleChange(value) {
        this.setState({ title: value });
    }
    handleBlogChange(value) {
        this.setState({ content: value });
    }


    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Blogs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#"
                                    onClick={(ev) => { this.home(ev) }}
                                >Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                    onClick={(ev) => { this.back(ev) }}
                                >Back <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                    onClick={() => { this.editBlog(this.props.match.params.id, ) }}>Submit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                    onClick={() => { this.deleteBlog(this.props.match.params.id) }}>Delete</a>
                            </li>


                        </ul>
                    </div>
                </nav>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={`${this.state.blog.title}`}
                        onChange={(event) => { this.handleTitleChange(event.target.value) }} />
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Blog</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea" placeholder={`${this.state.blog.content}`}
                        onChange={(event) => { this.handleBlogChange(event.target.value) }}></textarea>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add Tag/s</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.state.alltags.map((tag) => {

                            return (
                                <AddTag key={tag.id} name={tag.name} id={tag.id} blogid={this.props.match.params.id} addTag={(blog, tag) => { this.setTag(blog, tag) }} />
                            )
                        })}
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Remove Tag/s </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.state.tags.map((tag) => {

                            return (
                                <DelTag key={tag.id} name={tag.title} id={tag.id} blogid={this.props.match.params.id} delTag={(blog, tag) => { this.delTag(blog, tag) }} />
                            )
                        })}
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default EditBlog;
