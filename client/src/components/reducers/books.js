import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants/ActionTypes'
import { FETCH_BOOKS, DISPLAY_BOOKS, SHOW_ADD_NEW_BOOK, HIDE_ADD_NEW_BOOK } from '../constants/ActionTypes'

const initBookState = {
  myBooks: [],
  isFetching: false
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
    default:
      return state
  }
}