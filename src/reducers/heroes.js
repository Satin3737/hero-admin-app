const initialState = {
    heroesLoadingStatus: 'idle',
    heroes: []
}

const heroes = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'ADD_HERO':
            return {
                ...state,
                heroes: [...state.heroes, payload],
                heroesLoadingStatus: 'idle'
            }
        case 'REMOVE_HERO':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== payload),
                heroesLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default heroes;