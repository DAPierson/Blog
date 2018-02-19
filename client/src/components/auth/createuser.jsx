import React, {Component,Fragment} from 'react';

class CreateUser extends Component{
    constructor(props){
        super(props)

        this.state ={
            name: '',
            email: '',
            password: '',
        }
    
    }
    createUser(name,email,password) {
        fetch('/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        }).then(() => {
            this.props.history.goBack();
        }).catch((err) => {
            console.log(err);
        });
    }
    newUser(e){
e.preventDefault();
this.createUser(this.state.name,this.state.email,this.state.password);

}    handleEmailChange(value) {
        this.setState({ email: value });
    }
    handleNameChange(value) {
        this.setState({ name: value });
    }
    handlePasswordChange(value) {
        this.setState({ password: value });
    }
    home(ev) {
        this.props.history.push('/');
    };

render(){
    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
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
            <form onSubmit={(e) => this.newUser(e)}>
            <div className="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name"
    onChange={(e) => this.handleNameChange(e.target.value)} required/>
    <small id="nameHelp" className="form-text text-muted">What should we call you?</small>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
    onChange={(e) => this.handleEmailChange(e.target.value)} required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
    onChange={(e) => this.handlePasswordChange(e.target.value)} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
            </Fragment>
    )
}



}

export default CreateUser;