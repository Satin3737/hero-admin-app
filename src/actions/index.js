export const fetchHeroes = (request, activeFilter) => (dispatch) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes${activeFilter !== 'all' ? `?element=${activeFilter}` : ''}`)
        .then(data => {
            dispatch(heroesFetched(data))
        })
        .catch(() => dispatch(heroesFetchingError()));
}

export const postHero = (request, hero, form, formData) => (dispatch) => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
        .then(() => {
            dispatch(addHero(hero));
            dispatch(setActiveFilter(formData?.element));
            form.current.reset();
        })
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then(data => {
            dispatch(filtersFetched(data))
        })
        .catch(() => dispatch(filtersFetchingError()));
}

export const postRemoveHero = (request, id) => (dispatch) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => dispatch(removeHero(id)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero
    }
}

export const removeHero = (id) => {
    return {
        type: 'REMOVE_HERO',
        payload: id
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
}