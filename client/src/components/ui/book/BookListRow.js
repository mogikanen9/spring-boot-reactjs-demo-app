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
                    {this.props.publsihed}
                </td>
                <td>
                    {this.props.author}
                </td>
                <td>
                    <Button bsStyle="info" >View/Edit</Button>
                </td>
                <td>
                    <Button bsStyle="danger" >Delete</Button>
                </td>
            </tr>
        )
    }
}