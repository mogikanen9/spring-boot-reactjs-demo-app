import React, { Component } from 'react'
import { CustomPageHeader } from '../CustomPageHeader'
import { LoadingEl } from '../util/LoadingEl'
import { BookListExpandedRow } from './BookListExpandedRow'

import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table'

export class BookList extends Component {

    constructor(props) {
        super(props)
        this.renderBookTable = this.renderBookTable.bind(this)
        this.onDeleteRow = this.onDeleteRow.bind(this)
        console.log('this.props.isFetching->', this.props.isFetching)
    }

    componentDidMount() {
        this.props.loadBooks()
    }

    expandComponent(row) {
        return (
            <BookListExpandedRow description={row.description} author={row.authorInfo} />
        )
    }

    isExpandableRow(row) {
        return true
    }    

    onDeleteRow(rows) {
        for (let row of rows) {

            let books2Del = this.props.books.filter((book) => {
                return book.isbn === row
              })       
            //allow delete one book at a time only  
            let bookURI = books2Del[0]._links['self'].href
            console.log(`is selected to beremoved->${bookURI}`)
            this.props.deleteBook(bookURI)
        }
    }

    selectRowProp = {
        mode: "radio",
        clickToSelect: true,
        onSelect: this.onRowSelect,
        bgColor: "rgb(238, 193, 213)"
    }

    handleDeleteButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for DeleteButton click event');
        console.log(onClick)
        onClick();
    }

    createCustomDeleteButton = (onClick) => {
        return (
            <DeleteButton
                btnText='Delete Book'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={() => this.handleDeleteButtonClick(onClick)} />
        )
    }

    renderBookTable() {

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.books.length
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.            
            alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            // hidePageListOnlyOnePage: true > Hide the page list if only one page.
            onDeleteRow: this.onDeleteRow,
            deleteBtn: this.createCustomDeleteButton
        }

        return (
            <BootstrapTable
                data={this.props.books}
                pagination={true}
                options={options}
                expandableRow={this.isExpandableRow}
                expandComponent={this.expandComponent}
                selectRow={this.selectRowProp}
                deleteRow
                striped
                hover>
                <TableHeaderColumn isKey={true} dataField='isbn'>ISBN</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort={true} >Book Name</TableHeaderColumn>
                <TableHeaderColumn dataField='published'>Publication Date</TableHeaderColumn>
            </BootstrapTable>
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
