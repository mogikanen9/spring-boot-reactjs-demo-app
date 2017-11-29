import React, { connect } from 'react-redux'
import { BookList } from '../BookList'
import { fetchBooks } from '../../../actions/index'

const mapStateToProps = state => {
  return {
    books: state.books,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: () => {
      console.log('Dispatching fetchBooks...')
      dispatch(fetchBooks(dispatch, 10))
    }
  }
}

const VisibleBookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)

export default VisibleBookList
