import { combineReducers } from 'redux'
import books from './books'

const rootReducer = combineReducers({
    books: books
})

export default rootReducer