import {createAction} from '@reduxjs/toolkit';
import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice'

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFiltres = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
          .then(data => dispatch(filtresFetched(data)))
          .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = createAction('FILTERS_FETCHING');

export const filtresFetched = (filtres) => {
     return {
        type: 'FILTRES_FETCHED',
        payload: filtres
    }
}

 export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}