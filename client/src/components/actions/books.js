import { FETCH_BOOKS, DISPLAY_BOOKS } from '../constants/ActionTypes'
import { DELETE_BOOK, RESET_NEW_BOOK_PROPS } from '../constants/ActionTypes'
import { SHOW_ADD_NEW_BOOK, HIDE_ADD_NEW_BOOK } from '../constants/ActionTypes'
import { SET_NEW_BOOK_PROPS, UPDATE_VALIDATION_ERRORS } from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export const fetchBooks = (dispatch, pageSize) => {
    return {
        type: FETCH_BOOKS,
        isFetching: true,
        books: getBooksFromApi(pageSize, dispatch, displayBooks, displayBooks)
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

export const updateNewOrExistingBookProperty = (bookPropertyName, bookPropertyValue) => {
    return {
        type: SET_NEW_BOOK_PROPS,
        bookPropertyName: bookPropertyName,
        bookPropertyValue: bookPropertyValue
    }
}

export const updateValidationErrors = (errors) => {
    return {
        type: UPDATE_VALIDATION_ERRORS,
        validationErrors: errors
    }
}


export const resetNewOrExsitingBookProps = (dispatch) => {
    return {
        type: RESET_NEW_BOOK_PROPS
    }
}

export function submitBookWithValidation(newBook) {
    return (dispatch) => {
        let errors = validateNewBookValues(newBook)
        console.log('errors23->', errors)
        dispatch(updateValidationErrors(errors))

        if (errors.length === 0) {
            dispatch(addBookWithApi(newBook))
        }
    }
}

function validateNewBookValues(newBook) {
    let errors = []

    if ((!newBook.name) || (newBook.name.length === 0)) {
        errors.push({ fieldName: 'name', msg: 'Name of the book cannot be empty' })
    }

    if ((!newBook.isbn) || (newBook.isbn.length === 0)) {
        errors.push({ fieldName: 'isbn', msg: 'ISBN of the book cannot be empty' })
    }

    if ((!newBook.description) || (newBook.description.length === 0)) {
        errors.push({ fieldName: 'description', msg: 'Description of the book cannot be empty' })
    }

    if ((!newBook.author) || (newBook.author === "-1")) {
        errors.push({ fieldName: 'author', msg: 'Please, select book author' })
    }

    return errors
}

const BOOKS_API_URL = "http://localhost:8080/api/v1/books?size="

function getBooksFromApi(pageSize, dispatch, success, fail) {

    console.log(`fetching data from Book API url->`, BOOKS_API_URL + pageSize)
    fetch(BOOKS_API_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin'
    })
        .then((response) => {
            console.log("response.status->", response.status)
            if (response.ok) {

                response.json().then(function (data) {
                    console.log("data->", data)
                    if (success) {
                        dispatch(success(data._embedded.books))
                    }
                })
            } else if (response.status === 403) {
                console.warn("You are not authorized to view this page/data!")
                dispatch(fail([]))
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

function addBookWithApi(newBook) {

    return (dispatch) => {

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
                dispatch(resetNewOrExsitingBookProps(dispatch))
                dispatch(fetchBooks(dispatch, 5))
                dispatch(hideAddNewBook(dispatch))
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
}