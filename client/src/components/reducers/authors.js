import { FETCH_AUTHORS, DISPLAY_AUTHORS } from '../constants/ActionTypes'

const initAuthorsState = {
    myAuthors: [],
    isFetching: false
  }
  
  export default function authors(state = initAuthorsState, action) {
    console.log('authors->action.type->', action.type);
    switch (action.type) {
      case FETCH_AUTHORS: {
        return {
          ...state,
          isFetching: true
        }
      }
      case DISPLAY_AUTHORS: {
        console.log('action.books->', action.authors)
        return {
          ...state,
          myAuthors: action.authors,
          isFetching: false
        }
      }
      default:
        return state
    }
  }  