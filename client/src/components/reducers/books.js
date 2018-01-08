import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants/ActionTypes'
import { FETCH_BOOKS, DISPLAY_BOOKS, SHOW_ADD_NEW_BOOK, HIDE_ADD_NEW_BOOK,SET_NEW_BOOK_PROPS } from '../constants/ActionTypes'

const initBookState = {
  myBooks: [],
  isFetching: false,
  bookToAddOrEdit: {}
}

export default function books(state = initBookState, action) {
  console.log('books->action.type->', action.type);
  switch (action.type) {
    case ADD_BOOK: {      
      return {
        ...state
      }
    }
    case DELETE_BOOK: {
      console.log('removing book->', action.bookURI)
      return state
    }
    case FETCH_BOOKS: {
      return {
        ...state,
        isFetching: true
      }
    }
    case DISPLAY_BOOKS: {
      console.log('action.books->', action.books)
      return {
        ...state,
        myBooks: action.books,
        isFetching: false
      }
    }
    case SHOW_ADD_NEW_BOOK: {
      return {
        ...state,
        showAddNewBook: true
      }
    }
    case HIDE_ADD_NEW_BOOK: {
      return {
        ...state,
        showAddNewBook: false
      }
    }
    case SET_NEW_BOOK_PROPS: {

      const propName = action.bookPropertyName
      const propValue = action.bookPropertyValue
      state.bookToAddOrEdit[propName] = propValue
      console.log('state.bookToAddOrEdit->',state.bookToAddOrEdit)

      return {
        ...state,
        bookToAddOrEdit: state.bookToAddOrEdit
      }
    }
    default:
      return state
  }
}