import React, { Component } from 'react';
import { render } from 'react-dom';



class CreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        }
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



    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>

        )




    }
}

export default CreateBlog;