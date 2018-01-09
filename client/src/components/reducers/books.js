import { DELETE_BOOK } from '../constants/ActionTypes'
import { FETCH_BOOKS, DISPLAY_BOOKS, SHOW_ADD_NEW_BOOK, HIDE_ADD_NEW_BOOK } from '../constants/ActionTypes'
import { SET_NEW_BOOK_PROPS, UPDATE_VALIDATION_ERRORS, RESET_NEW_BOOK_PROPS } from '../constants/ActionTypes'

const initBookState = {
  myBooks: [],
  isFetching: false,
  bookToAddOrEdit: {},
  validationErrors: []
}

export default function books(state = initBookState, action) {
  console.log('books->action.type->', action.type);
  switch (action.type) {
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
      console.log('state.bookToAddOrEdit->', state.bookToAddOrEdit)

      return {
        ...state,
        bookToAddOrEdit: state.bookToAddOrEdit
      }
    }
    case RESET_NEW_BOOK_PROPS:{
      return {
        ...state,
        bookToAddOrEdit: {}
      }
    }
    case UPDATE_VALIDATION_ERRORS: {
      console.log('reducers: UPDATE_VALIDATION_ERRORS->',action.validationErrors)
      return {
        ...state,
        validationErrors: action.validationErrors
      }
    }
    default:
      return state
  }
}