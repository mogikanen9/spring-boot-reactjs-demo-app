import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

export class BookForm extends Component {

    constructor(props) {
        super(props)
        this.handleDayChange = this.handleDayChange.bind(this)
        this.buildAuthorListOptions = this.buildAuthorListOptions.bind(this)
    }

    componentDidMount() {
        this.props.loadAuthors()
    }

    handleDayChange(day) {
        console.log('selected publicationDate->', day)
    }

    buildAuthorListOptions(authors){        
        return authors.map(function(author){
            return (<option value={author.id}>{author.firstName} {author.lastName}</option>)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Add Book</h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="addIsbn">ISBN:</label>
                                        <input type="text"
                                            className="form-control"
                                            id="addIsbn"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addBookName">Book Name:</label>
                                        <input type="text"
                                            className="form-control"
                                            id="addBookName"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addPubDate">Publication Date:</label>
                                        <div>
                                            <DayPickerInput
                                                onDayChange={this.handleDayChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addAuthor">Author:</label>
                                        <select id="addAuthor" className="form-control">
                                            {this.buildAuthorListOptions(this.props.authors)}
                                        </select>
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
                    <div className="col-md-4"></div>
                </div>
            </div>)
    }
}