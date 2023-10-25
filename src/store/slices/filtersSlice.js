import {createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const {createSlice} = require("@reduxjs/toolkit");

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name
});
const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilter: (state, {payload}) => {
            state.activeFilter = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, {payload}) => {
                filtersAdapter.setAll(state, payload);
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = 'error';
            })
    }
});

const {actions, reducer} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);
export const {setActiveFilter} = actions;
export default reducer;