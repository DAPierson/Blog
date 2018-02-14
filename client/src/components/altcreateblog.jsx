import React, { Component } from 'react';
import { render } from 'react-dom';
import AddTag from './addtag';
import Checkbox from './checkbox';


class AltCreateBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            addtags: [],
        }
    }

    componentDidMount() {
        this.getTags()
        console.log(this.state.tags)
    }
checkbox(id){
    if( this.state.addtags[id-1] ===null){
        this.state.addtags.splice(id-1,1,id);
    }else{
        this.state.addtags.splice(id-1,1,null);
    }
    console.log(this.state.addtags);
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
                let addtagsArray =[];
                for (let i = 0; i < tags.length; i++) {

                    tagsArray.push({
                        name: tags[i].name,
                        id: tags[i].id,


                    });
                    addtagsArray.push(null)
                }
                this.setState({
                    tags: tagsArray

                });
                this.setState({
                    addtags: addtagsArray
                });
                console.log(this.state.addtags)
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
                <form>
                    <div className="form-group">
                        <label >Title</label>
                        <input type="email" className="form-control" placeholder="Your Blogs Title" />
                    </div>


                    <div className="form-group">
                        <label >Your Blog</label>
                        <textarea className="form-control"  rows="3"></textarea>
                    </div>
                    <label> Tags:
                    {this.state.tags.map((tag) => {

                        return (

                            <Checkbox key={tag.id} name={tag.name} id={tag.id} checkbox={(id) => { this.checkbox(id) }} />
                        )

                    })}
                    </label><br/>
                    <button type='submit'>Submit</button>
                </form>



            </React.Fragment>

        )




    }
}

export default AltCreateBlog;