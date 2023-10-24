import {
    addHero,
    heroesFetchingError,
    heroesFetchingFinish,
    heroesFetchingStart,
    removeHero
} from "../store/slices/heroesSlice";
import {
    filterFetchingError,
    filterFetchingFinish,
    filterFetchingStart,
    setActiveFilter
} from "../store/slices/filtersSlice";

export const fetchHeroes = (request, activeFilter) => (dispatch) => {
    dispatch(heroesFetchingStart());
    request(`http://localhost:3001/heroes${activeFilter !== 'all' ? `?element=${activeFilter}` : ''}`)
        .then(data => {
            dispatch(heroesFetchingFinish(data))
        })
        .catch(() => dispatch(heroesFetchingError()));
}

export const postHero = (request, hero, form, formData) => (dispatch) => {
    dispatch(heroesFetchingStart());
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
        .then(() => {
            dispatch(addHero(hero));
            dispatch(setActiveFilter(formData?.element));
            form.current.reset();
        })
        .catch(() => dispatch(heroesFetchingError()));
}

export const postRemoveHero = (request, id) => (dispatch) => {
    dispatch(heroesFetchingStart());
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => dispatch(removeHero(id)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filterFetchingStart());
    request('http://localhost:3001/filters')
        .then(data => {
            dispatch(filterFetchingFinish(data))
        })
        .catch(() => dispatch(filterFetchingError()));
}

