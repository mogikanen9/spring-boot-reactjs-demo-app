import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { CustomPageHeader } from '../CustomPageHeader'
import { BookListRow } from './BookListRow'

export class BookList extends Component {

    constructor(props) {
        super(props)
        this.renderBookRow = this.renderBookRow.bind(this)
    }

    getBooksFromApiAsync() {
        console.log('getBooksFromApiAsync...')
    }

    componentDidMount() {
        this.getBooksFromApiAsync()
    }

    renderBookRow(theBook) {
        return <BookListRow isbn={theBook.isbn} name={theBook.name} published={theBook.published}/>
    }

    render() {

        return (
            <div className="container">
                <CustomPageHeader headerTitle="Books" />
                <div className="row">
                    <div className="col-md-12">
                        {this.props.books.map(theBook => this.renderBookRow(theBook))}
                      </div>
                </div>
            </div>
        )
    }
}
