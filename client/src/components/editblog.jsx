import React, { Component, Fragment } from 'react';
import { Link } from 'react-dom';

class EditBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blog: [],
            title: "",
            content: "",
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
    editBlog(id,values) {
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
    home(ev){
        this.props.history.push('/');
    };
  
    back(ev){
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
                    <textarea className="form-control" aria-label="With textarea" placeholder ={`${this.state.blog.content}`}
                        onChange={(event) => { this.handleBlogChange(event.target.value) }}></textarea>
                </div>
                <button
                onClick={() => { this.editBlog(this.props.match.params.id,) }}>Edit</button>
                <button
                onClick={(ev) => { this.back(ev) }}>Back</button>
                <button
                onClick={(ev) => { this.home(ev) }}>Home</button>

            </Fragment>
        );
    }
}

export default EditBlog;
