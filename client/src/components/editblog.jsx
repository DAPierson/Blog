import React, { Component, Fragment } from 'react';
import { Link } from 'react-dom';
import AddTag from './addtag';
import DelTag from './deltag';
import Checkbox from './checkbox';
import * as blogService from '../services/blog';

class EditBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addtags: [],
            currenttags: [],
            alltags: [],
            blog: [],
            title: "",
            content: "",
        };

        let post = {
            id: 0,
            title: '',
            content: '',
            tags: [{
                id: 0,
                name: 'Baseball'
            }]
        };
    }

    componentDidMount() {
        this.getBlog(this.props.match.params.id)
        this.getBlogTag(this.props.match.params.id)
        this.getTags()
    }

    edit(e) {
        e.preventDefault();
        this.editBlog(this.props.match.params.id)

    }

    checkbox(tag) {
        tag.checked = !tag.checked;

        this.setState({ addtags: this.state.addtags });
    }

    delTags(id) {
        blogService.destroyTag(id)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }

    deleteBlog(id) {
        blogService.destroy(id)
            .then(() => {
                this.props.history.push("/");
            }).catch((err) => {
                console.log(err);
            });
    }

    getBlogTag(id) {
        blogService.blogTag(id)
            .then((tags) => {
                let tagsArray = [];
                for (let i = 0; i < tags.length; i++) {
                    tagsArray.push({
                        id: tags[i].id,
                        title: tags[i].name,
                    });
                }
                this.setState({
                    currenttags: tagsArray
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getBlog(id) {
        blogService.one(id)
            .then((blog) => {
                this.setState({ title: blog.title });
                this.setState({ content: blog.content })
            }).catch((err) => {

            });
    };

    editBlog(id) {
        blogService.update(id, {
            title: this.state.title,
            content: this.state.content,

        }).then((res) => {

            this.delTags(this.props.match.params.id);
        }).then(() => {
            this.setTag(this.props.match.params.id, this.state.addtags);
            this.props.history.push('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    getTags() {
        blogService.allTags()

            .then((tags) => {
                let addtagsArray = tags.map((tag) => {
                    let found = this.state.currenttags.some((t) => {
                        return t.id === tag.id;
                    });

                    if (found) {
                        tag.checked = true;
                    }

                    return tag;
                });
                this.setState({
                    alltags: tags
                });
                this.setState({
                    addtags: addtagsArray
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setTag(blog, tags) {
        console.log(tags);
        tags.map((tag) => {
            if (tag.checked === true) {
                blogService.insertTags({
                    blog,
                    tag: tag.id,
                })
            }
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
                                    onClick={() => { this.deleteBlog(this.props.match.params.id) }}>Delete</a>
                            </li>


                        </ul>
                    </div>
                </nav>
                <form onSubmit={(e) => this.edit(e)}>
                    <div className="form-group">
                        <label >Edit Title</label>
                        <input type="text" className="form-control" placeholder={this.state.title}
                            onChange={(event) => { this.handleTitleChange(event.target.value) }} />
                    </div>


                    <div className="form-group">
                        <label >Edit your Blog</label>
                        <textarea className="form-control" rows="3" placeholder={this.state.content}
                            onChange={(event) => { this.handleBlogChange(event.target.value) }}></textarea>
                    </div>

                    <label> Tags:
                    {this.state.addtags.map((tag) => {
                            return (
                                <Checkbox key={tag.id} tag={tag} checkbox={(tag) => { this.checkbox(tag) }} />
                            );
                        })}
                    </label><br />

                    <button type='submit'>Edit</button>
                </form>


            </Fragment>
        );
    }
}

export default EditBlog;
