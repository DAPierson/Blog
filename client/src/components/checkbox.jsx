import React, { Component, Fragment } from 'react';


class Checkbox extends Component {

    toggleCheckbox(tag) {
        this.props.checkbox(tag);
    }



    render() {
        let tag = this.props.tag;
        if (!tag.checked) {
            return (
                <Fragment>
                    <input type='checkbox' checked={false} value={tag.id} onChange={(event) => { this.toggleCheckbox(tag) }} /><label htmlFor={tag.id}>{tag.name}</label>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <input type='checkbox' checked={true} value={tag.id} onChange={(event) => { this.toggleCheckbox(tag) }} /><label htmlFor={tag.id}>{tag.name}</label>
                </Fragment>
            );
        }

    }
}


export default Checkbox;