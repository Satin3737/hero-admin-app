import {createAsyncThunk} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const {createSlice} = require("@reduxjs/toolkit");

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filtersLoadingStatus: 'idle',
        filters: [],
        activeFilter: 'all'
    },
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
                state.filters = payload;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = 'error';
            })
    }
});

const {actions, reducer} = filtersSlice;

export const {setActiveFilter} = actions;
export default reducer;