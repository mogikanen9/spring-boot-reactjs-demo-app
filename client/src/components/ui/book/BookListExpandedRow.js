import React, { Component } from 'react'

export class BookListExpandedRow extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <table className="table table-condensed">
                    <tr>
                        <td>
                            Author:
                        </td>
                        <td>
                            {this.props.author}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Description:
                        </td>
                        <td>
                            {this.props.description}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}