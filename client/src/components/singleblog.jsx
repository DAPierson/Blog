
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Blogtags from './blogtags';

class SingleBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blog: [],
            tags:[],
        }
    }



    componentDidMount() {
        this.getBlog(this.props.match.params.id)
        this.getBlogTag(this.props.match.params.id)
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
    deleteBlog(id) {
        fetch(`/api/Blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
            this.props.history.goBack();
        }).catch((err) => {
            console.log(err);
        });
    }
    getBlogTag(id) {
        console.log(id)
        fetch(`/api/blogs/blog/${id}`)
            .then((response) => {
                return response.json();
            }).then((tags) => {
                let tagsArray = [];
                for (let i = 0; i < tags.length; i++) {
                tagsArray.push({
                      
                        id: tags[i].id,
                        name: tags[i].name,
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
    home(ev){
        this.props.history.goBack();
    };


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
                            <Link to={`/${this.props.match.params.id}/edit`} className="nav-link">  Edit</Link>
                            </li>
                           


                        </ul>
                    </div>
                </nav>
              
                <div className="card">
  <h5 className="card-header">Tags:
  {this.state.tags.map((tag) => {
return (
    <Blogtags key={tag.id} name={tag.name} id={tag.id}  />
)
})}</h5>
  <div className="card-body">
    <h5 className="card-title">{this.state.blog.title}</h5>
    <p className="card-text">{this.state.blog.content}</p>
    
  </div>
</div>
              
           

            </Fragment>
        );
    }
}

export default SingleBlog;
