import React, { Component } from 'react';
import { render } from 'react-dom';
import AddTag from './addtag';
import Checkbox from './checkbox';


class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            addtags: [],
            blogid: [],
            alltags: [],
            currenttags: [],
        }
    }

    componentDidMount() {
        this.getTags()

    }
    checkbox(tag) {
        tag.checked = !tag.checked;

        this.setState({ addtags: this.state.addtags });
    }

    blogSubmit(e) {
        e.preventDefault();
        this.createBlog();

    


    }
    getTags() {
        fetch('/api/Tags/')
            .then((response) => {
                return response.json();
            }).then((tags) => {
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
        }).then((res) => {
            return res.json();
        }).then((res) => {
            this.setState({ blogid: res.id });
            this.setTag(this.state.blogid,this.state.addtags);
        }).then(() => {
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
        })

    }
    setTag(blog, tags) {
        console.log(tags);
        tags.map((tag)=>{
            if(tag.checked===true){
        fetch('/api/Blogs/addtag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blog,
                tag: tag.id,
            })
        }).catch((err) => {
            console.log(err);
        })}
        });
    }


    handleTitleChange(value) {
        this.setState({ title: value });
    }
    handleBlogChange(value) {
        this.setState({ content: value });
    }

    home(ev) {
        this.props.history.push("/");
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
                <form onSubmit={(e) => this.blogSubmit(e)}>
                    <div className="form-group">
                        <label >Title</label>
                        <input type="text" className="form-control" placeholder="Your Blogs Title"
                            onChange={(event) => { this.handleTitleChange(event.target.value) }} />
                    </div>


                    <div className="form-group">
                        <label >Your Blog</label>
                        <textarea className="form-control" rows="3"
                            onChange={(event) => { this.handleBlogChange(event.target.value) }}></textarea>
                    </div>

                 <label> Tags:
                    {this.state.addtags.map((tag) => {
                            return (
                                <Checkbox key={tag.id} tag={tag} checkbox={(tag) => { this.checkbox(tag) }} />
                            );
                        })}
                    </label><br />

                    <button type='submit'>Submit</button>
                </form>



            </React.Fragment>

        )




    }
}

export default CreateBlog;