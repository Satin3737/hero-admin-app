const {createSlice} = require("@reduxjs/toolkit");

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: {
        heroesLoadingStatus: 'idle',
        heroes: []
    },
    reducers: {
        heroesFetchingStart: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetchingError: (state) => {
            state.heroesLoadingStatus = 'error';
        },
        heroesFetchingFinish: (state, {payload}) => {
            state.heroes = payload;
            state.heroesLoadingStatus = 'idle';
        },
        addHero: (state, {payload}) => {
            state.heroes.push(payload);
            state.heroesLoadingStatus = 'idle';
        },
        removeHero: (state, {payload}) => {
            state.heroes = state.heroes.filter(hero => hero.id !== payload)
            state.heroesLoadingStatus = 'idle';
        },
    }
});

const {actions, reducer} = heroesSlice;

export const {heroesFetchingStart, heroesFetchingFinish, heroesFetchingError, addHero, removeHero} = actions;
export default reducer;
