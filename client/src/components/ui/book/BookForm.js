import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class BookForm extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return [
            <div>Add Book placeholder</div>,
            <Button onClick={this.props.handleHideForm}>Cancel</Button>
        ]
    }
}