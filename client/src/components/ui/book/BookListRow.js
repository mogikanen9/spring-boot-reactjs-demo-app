import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class BookListRow extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {

        return (
            <tr>
                <td>
                    {this.props.isbn}
                </td>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.published}
                </td>
                <td>
                    
                </td>
                <td>
                    <Button bsStyle="info" >View/Edit</Button>
                    <Button bsStyle="danger" >Delete</Button>
                </td>
            </tr>
        )
    }
}