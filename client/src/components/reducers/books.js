import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, FETCH_BOOKS, DISPLAY_BOOKS } from '../constants/ActionTypes'

const initBookState = {
    myBooks: [],
    isFetching: false
  }


export default function books(state = initBookState, action) {
  console.log('books->action.type->', action.type);
  switch (action.type) {
    case ADD_BOOK: {
      console.log('action.newBook->', action.newBook)
      return { 
        ...state, 
        myBooks: state.myBooks.push(action.newBook)
     }
    }
    case DELETE_BOOK:
      return state
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
    default:
      return state
  }
}