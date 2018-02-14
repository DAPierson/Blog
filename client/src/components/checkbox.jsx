import React, { Component, Fragment } from 'react';


class Checkbox extends Component {

toggleCheckbox(id){
    console.log(id-1);
    this.props.checkbox(id);
}



    render() {
        return (
            <Fragment>
                
                <input type='checkbox' value={this.props.id}  onChange={(event) => {this.toggleCheckbox(this.props.id)}}/>{this.props.name}


            </Fragment>
        );
    }
}

export default Checkbox;