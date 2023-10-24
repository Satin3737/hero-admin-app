import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const {createSlice} = require("@reduxjs/toolkit");

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', (activeFilter) => {
        const {request} = useHttp();
        return request(`http://localhost:3001/heroes${activeFilter !== 'all' ? `?element=${activeFilter}` : ''}`);
    }
);

export const createHero = createAsyncThunk('heroes/createHero', (hero) => {
        const {request} = useHttp();
        return request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero));
    }
);

export const removeHero = createAsyncThunk('heroes/removeHero', (id) => {
        const {request} = useHttp();
        return request(`http://localhost:3001/heroes/${id}`, 'DELETE');
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: {
        heroesLoadingStatus: 'idle',
        heroes: [],
        deletedHeroId: ''
    },
    reducers: {
        setDeletedHero: (state, {payload}) => {
            state.deletedHeroId = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, {payload}) => {
                state.heroes = payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(createHero.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(createHero.fulfilled, (state, {payload}) => {
                state.heroes = [...state.heroes, payload];
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(createHero.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addCase(removeHero.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(removeHero.fulfilled, (state) => {
                state.heroes = state.heroes.filter(hero => hero.id !== state.deletedHeroId);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(removeHero.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = heroesSlice;

export const {setDeletedHero} = actions;
export default reducer;
