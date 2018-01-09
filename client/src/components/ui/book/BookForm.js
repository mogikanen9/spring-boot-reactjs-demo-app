import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import BookFormErrors from './BookFormErrors'

export class BookForm extends Component {

    constructor(props) {
        super(props)
        this.handleDayChange = this.handleDayChange.bind(this)
        this.buildAuthorListOptions = this.buildAuthorListOptions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePropertyChange = this.handlePropertyChange.bind(this)
    }

    componentDidMount() {
        this.props.loadAuthors()
    }

    handleDayChange(day) {
        console.log('selected publicationDate->', day)
        this.props.updateNewOrExistingBookProperty('published', day)
    }

    buildAuthorListOptions(authors) {
        return authors.map(function (author) {
            return (<option value={author._links.self.href} key={author.id}>{author.fullName}</option>)
        })
    }

    handlePropertyChange(e) {
        console.log('handlePropertyChange->', e.target)
        const target = e.target
        const value = target.value
        const name = target.name
        this.props.updateNewOrExistingBookProperty(name, value)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.submitBookWithValidation(this.props.bookToAddOrEdit)
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
                                <BookFormErrors formErrors={this.props.validationErrors} />
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="addIsbn">ISBN:</label>
                                        <input type="text"
                                            className="form-control"
                                            id="addIsbn"
                                            name="isbn"
                                            maxLength="10"
                                            onChange={this.handlePropertyChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addBookName">Book Name:</label>
                                        <input type="text"
                                            className="form-control"
                                            id="addBookName"
                                            name="name"
                                            maxLength="100"
                                            onChange={this.handlePropertyChange}></input>
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
                                        <select id="addAuthor"
                                            className="form-control"
                                            onChange={this.handlePropertyChange}
                                            name="author">
                                            <option value="-1" key="-1">Please select</option>
                                            {this.buildAuthorListOptions(this.props.authors)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="addDesc">Description:</label>
                                        <textarea className="form-control"
                                            rows="5"
                                            id="addDesc"
                                            name="description"
                                            maxLength="255"
                                            onChange={this.handlePropertyChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <Button
                                            onClick={this.props.handleHideForm}
                                            bsStyle="default">Cancel</Button>
                                        <Button onClick={this.handleSubmit}
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