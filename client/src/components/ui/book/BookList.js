import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { CustomPageHeader } from '../CustomPageHeader'
import { BookListRow } from './BookListRow'
import { LoadingEl } from '../util/LoadingEl'

export class BookList extends Component {

    constructor(props) {
        super(props)
        this.renderBookRow = this.renderBookRow.bind(this)
        this.renderBookTable = this.renderBookTable.bind(this)
        console.log('this.props.isFetching->', this.props.isFetching)
    }

    componentDidMount() {
        this.props.loadBooks()
    }

    renderBookRow(theBook) {
        return <BookListRow id={theBook.id} isbn={theBook.isbn} name={theBook.name} published={theBook.published} author={theBook.author} />
    }

    renderBookTable() {
        return (
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
        )
    }

    render() {

        let content = this.renderBookTable()
        if (this.props.isFetching === true) {
            content = (<LoadingEl />)
        }

        return (
            <div className="container">
                <CustomPageHeader headerTitle="Books" />
                <div className="row">
                    <div className="col-md-12">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
