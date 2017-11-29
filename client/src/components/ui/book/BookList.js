import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { CustomPageHeader } from '../CustomPageHeader'
import { BookListRow } from './BookListRow'

export class BookList extends Component {

    constructor(props) {
        super(props)
        this.renderBookRow = this.renderBookRow.bind(this)
    }

    componentDidMount() {
        this.props.loadBooks()
    }

    renderBookRow(theBook) {
        return <BookListRow id={theBook.id} isbn={theBook.isbn} name={theBook.name} published={theBook.published} author={theBook.author} />
    }

    render() {
        return (
            <div className="container">
                <CustomPageHeader headerTitle="Books" />
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Name</th>
                                    <th>Published</th>
                                    <th>Author</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.books.map(theBook => this.renderBookRow(theBook))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
