import React, { connect } from 'react-redux'
import { BookForm } from '../BookForm'
import { fetchAuthors } from '../../../actions/authors'
import { updateNewOrExistingBookProperty, addNewBook } from '../../../actions/index'

const mapStateToProps = state => {
  console.log('state->', state)
  return {
    authors: state.authors.myAuthors,
    isFetching: state.authors.isFetching,
    bookToAddOrEdit: state.books.bookToAddOrEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {

    loadAuthors: () => {
      console.log('Dispatching fetchAuthors...')
      dispatch(fetchAuthors(dispatch, 25))
    },

    updateNewOrExistingBookProperty: (name, value) => {
      console.log('Dispatching updateNewOrExistingBook...')
      dispatch(updateNewOrExistingBookProperty(name, value))
    },
    addNewBook: (newBook, callback) => {
      dispatch(addNewBook(dispatch, newBook, callback))
    }
  }
}

const VisibleBookForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm)

export default VisibleBookForm

