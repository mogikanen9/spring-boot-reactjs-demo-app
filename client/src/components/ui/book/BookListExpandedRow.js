import React, { Component } from 'react'

export class BookListExpandedRow extends Component {

    render() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Additional book information</div>
                <div className="panel-body">
                    <table className="table table-condensed">
                        <tbody>
                            <tr>
                                <td className="col-md-3">
                                    Author:
                        </td>
                                <td className="col-md-9">
                                    {this.props.author}
                                </td>
                            </tr>
                            <tr>
                                <td className="col-md-3">
                                    Description:
                        </td>
                                <td className="col-md-9">
                                    {this.props.description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}