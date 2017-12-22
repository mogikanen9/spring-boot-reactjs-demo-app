import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class BookForm extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Add Book</h3>
                        </div>
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="ISBN">ISBN:</label>
                                    <input type="text"
                                        className="form-control"
                                        id="isbn"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Book Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="publicationDate">Publication Date:</label>
                                    <input type="text"
                                        className="form-control"
                                        id="publicationDate"></input>
                                </div>
                                <div className="form-group">
                                    <Button
                                        onClick={this.props.handleHideForm}
                                        bsStyle="default">Cancel</Button>
                                    <Button onClick={this.props.handleSubmitForm}
                                        bsStyle="default"
                                        type="submit">Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}