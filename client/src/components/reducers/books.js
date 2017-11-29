import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, FETCH_BOOKS, DISPLAY_BOOKS } from '../constants/ActionTypes'

const initialState = [
  {
    id: 0,
    name: 'Test Book',
    isbn: '1111111',
    published: '1900-01-01',
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe'
    },
    description: 'Some desc...'
  }
]

export default function books(state = initialState, action) {
  console.log('books->action.type->', action.type);
  switch (action.type) {
    case ADD_BOOK: {
      console.log('action.newBook->', action.newBook)
      return [...state, action.newBook]
    }
    case DELETE_BOOK:
      return state
    case FETCH_BOOKS: {
      //return action.isFetching
      return state
    }
    case DISPLAY_BOOKS: {
      console.log('action.books->', action.books)
      return action.books
    }
    default:
      return state
  }
}