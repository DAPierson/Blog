import React, { Component } from 'react';
import { render } from 'react-dom';
import AddTag from './addtag';


class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: []
        }
    }

    componentDidMount() {
        this.getTags()
    }


    createBlog(values) {
        fetch('/api/Blogs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,
            })
        }).then(() => {
            this.props.history.goBack();
        }).catch((err) => {
            console.log(err);
        });
    }
    handleTitleChange(value) {
        this.setState({ title: value });
    }
    handleBlogChange(value) {
        this.setState({ content: value });
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

    home(ev) {
        this.props.history.goBack();
    }


    render() {
        return (
            <React.Fragment>
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
                        </ul>
                    </div>
                </nav>
                <h1> Make a Blog </h1>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => { this.handleTitleChange(event.target.value) }} />
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Blog</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea"
                        onChange={(event) => { this.handleBlogChange(event.target.value) }}></textarea>
                </div>
                <button type="button" className="btn btn-primary btn-lg btn-block"
                    onClick={() => { this.createBlog(this.state) }}>Post your Blog</button>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add Tag/s
  </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.state.tags.map((tag) => {

                            return (
                                <AddTag key={tag.id} name={tag.name} id={tag.id} />
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>

        )




    }
}

export default CreateBlog;