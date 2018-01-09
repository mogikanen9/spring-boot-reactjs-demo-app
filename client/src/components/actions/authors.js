import { FETCH_AUTHORS, DISPLAY_AUTHORS } from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export const fetchAuthors = (dispatch, pageSize) => {
    return {
        type: FETCH_AUTHORS,
        isFetching: true,
        books: getAuthorsFromApi(dispatch, pageSize)
    }
}

export const displayAuthors = (theAuthors) => {
    return {
        type: DISPLAY_AUTHORS,
        isFetching: false,
        authors: theAuthors
    }
}

const API_URL_AUTHORS = "http://localhost:8080/api/v1/authors?size="

function getAuthorsFromApi(dispatch, pageSize) {
    console.log(`fetching data from Author API url->`, API_URL_AUTHORS + pageSize)
    fetch(API_URL_AUTHORS, {
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
                    dispatch(displayAuthors(data._embedded.authors))
                })

            } else if (response.status === 403) {
                console.warn("You are not authorized to view this page/data!")
                dispatch(displayAuthors([]))
            } else {
                throw Error(response.statusText)
            }
        }).catch((error) => {
            console.error(error);
        })
}