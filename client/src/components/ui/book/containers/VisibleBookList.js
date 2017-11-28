import React, { connect } from 'react-redux'
import { BookList } from '../BookList'

const mapStateToProps = state => {
  return {
    books: state.books
  }
}


const VisibleBookList = connect(
  mapStateToProps,
  null
)(BookList)

export default VisibleBookList
