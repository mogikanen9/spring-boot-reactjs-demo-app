import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants/ActionTypes'

const initialState = [
  {    
    id: 0,
    name: 'Test Book',
    isbn: '1111111',
    publsihed: '1900-01-01',
    author: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe'
    },
    description: 'Some desc...'
  }
]

export default function books(state = initialState, action) {
    console.log('books->action.type->',action.type,',action.item->', action.item)  
  switch (action.type) {
    case ADD_BOOK: {      
      return [...state, action.newBook]
    }
    case DELETE_BOOK:
      return state   
    default:
      return state
  }
}