import React, { connect } from 'react-redux'
import { BookList } from '../BookList'
import { fetchBooks, deleteBook } from '../../../actions/index'

const mapStateToProps = state => {
  console.log('state->', state)
  console.log('state.books->', state.books)
  console.log('state.books.myBooks->', state.books.myBooks)
  console.log('state.books.isFetching->', state.books.isFetching)
  return {
    books: state.books.myBooks,
    isFetching: state.books.isFetching
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
    }
  }
}

const VisibleBookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)

export default VisibleBookList
