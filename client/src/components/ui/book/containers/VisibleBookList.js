import React, { connect } from 'react-redux'
import { BookList } from '../BookList'
import { fetchBooks, deleteBook, showAddNewBook, hideAddNewBook } from '../../../actions/books'

const mapStateToProps = state => {
  console.log('state->', state)
  return {
    books: state.books.myBooks,
    isFetching: state.books.isFetching,
    showAddNewBook: state.books.showAddNewBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => {
      console.log('Dispatching fetchBooks...')
      dispatch(fetchBooks(dispatch, 10))
    },

    deleteBook: (bookURI) => {
      console.log('Dispatching deleteBook...')
      dispatch(deleteBook(dispatch, bookURI))
    },
    showAddNewBookForm: () => {
      console.log('Showing add new book form...')
      dispatch(showAddNewBook(dispatch))
    },
    hideAddNewBookForm: () => {
      dispatch(hideAddNewBook(dispatch))
    }
  }
}

const VisibleBookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)

export default VisibleBookList
