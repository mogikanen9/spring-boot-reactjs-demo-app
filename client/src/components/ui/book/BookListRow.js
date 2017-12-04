import React, { Component } from 'react'

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
                </td>
            </tr>
        )
    }
}