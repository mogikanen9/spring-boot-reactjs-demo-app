import { FETCH_BOOKS, DISPLAY_BOOKS, DELETE_BOOK } from '../constants/ActionTypes'
import { SHOW_ADD_NEW_BOOK, HIDE_ADD_NEW_BOOK, ADD_BOOK, SET_NEW_BOOK_PROPS } from '../constants/ActionTypes'
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

export const deleteBook = (dispatch, bookURI) => {
    return {
        type: DELETE_BOOK,
        isFetching: true,
        bookURI: deleteBookWithApi(dispatch, bookURI)
    }
}

export const showAddNewBook = (dispatch) => {
    return {
        type: SHOW_ADD_NEW_BOOK
    }
}

export const hideAddNewBook = (dispatch) => {
    return {
        type: HIDE_ADD_NEW_BOOK
    }
}

export const addNewBook = (dispatch, newBook, callback) => {

    return dispatch => {
        dispatch(callback)
        return addBookWithApi(dispatch, newBook)        
      }
}

export const updateNewOrExistingBookProperty = (bookPropertyName, bookPropertyValue) => {
    return {
        type: SET_NEW_BOOK_PROPS,
        bookPropertyName: bookPropertyName,
        bookPropertyValue: bookPropertyValue
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
        //.then((response) => response.json())
        .then((response) => {
            console.log("response.status->", response.status)
            if (response.ok) {

                response.json().then(function (data) {
                    console.log("data->", data)
                    dispatch(displayBooks(data._embedded.books))
                })

            } else if (response.status === 403) {
                console.warn("You are not authorized to view this page/data!")
                dispatch(displayBooks([]))
            } else {
                throw Error(response.statusText)
            }
        }).catch((error) => {
            console.error(error);
        })
}

function deleteBookWithApi(dispatch, bookURI) {

    fetch(bookURI, {
        method: "DELETE",
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => {
        console.log("deleteBook: response.status->", response.status)
        if (response.ok) {
            //dispatch(getBooksFromApi(dispatch, 5))            
        } else if (response.status === 403) {
            console.log('not authorized to remove books')
        } else {
            throw Error(response.statusText)
        }
    })
        .catch((error) => {
            console.error(error);
        })

}

function addBookWithApi(dispatch, newBook) {

    fetch(BOOKS_API_URL, {
        method: "POST",
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newBook),
    }).then((response) => {
        console.log("addBookWithApi: response.status->", response.status)
        if (response.ok) {
            dispatch(fetchBooks(dispatch, 5))            
        } else if (response.status === 403) {
            //console.log('not authorized to add book(s)')
            throw Error('not authorized to add book(s)')
        } else {
            throw Error(response.statusText)
        }
    })
        .catch((error) => {
            console.error(error);
        })

}