import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, GET_BOOK, FETCH_BOOKS, DISPLAY_BOOKS } from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export const fetchBooks = (dispatch, pageSize) => {
    return {
        type: FETCH_BOOKS,
        isFetching: true,
        books: getBooksFromApi(dispatch, pageSize)
    }
}

export const displayBooks = (theBooks) => {
    return {
        type: DISPLAY_BOOKS,
        isFetching: false,
        books: theBooks
    }
}

const BOOKS_API_URL = "http://localhost:8080/api/v1/books?size="

function getBooksFromApi(dispatch, pageSize) {

    console.log(`fetching data from Book API url->`, BOOKS_API_URL + pageSize)
    fetch(BOOKS_API_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin'
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson.status->", responseJson.status)
            if (responseJson.status == "403") {
                console.log("You are not authorized to view this page/data!")
                dispatch(displayBooks([]))
            } else {
                console.log("responseJson.books->", responseJson._embedded.books)
                dispatch(displayBooks(responseJson._embedded.books))
            }
        }).catch((error) => {
            console.error(error);
        })
}