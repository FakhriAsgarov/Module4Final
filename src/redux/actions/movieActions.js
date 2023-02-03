import * as actionTypes from './actionTypes'

export function searchMovie(value){
    return {type: actionTypes.SEARCH_MOVIE, payload:value}
}

export function addFavorites(movie){
    return {
        type: actionTypes.ADD_FAVORITES, payload:movie
    }
}

export function deleteFavorites(movie){
    return {
        type: actionTypes.DEL_FAVORITE, payload:movie
    }
}
