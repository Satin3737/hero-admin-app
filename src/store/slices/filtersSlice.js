const {createSlice} = require("@reduxjs/toolkit");

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filtersLoadingStatus: 'idle',
        filters: [],
        activeFilter: 'all'
    },
    reducers: {
        filterFetchingStart: (state) => {
            state.filtersLoadingStatus = 'loading';
        },
        filterFetchingError: (state) => {
            state.filtersLoadingStatus = 'error';
        },
        filterFetchingFinish: (state, {payload}) => {
            state.filters = payload;
            state.filtersLoadingStatus = 'idle';
        },
        setActiveFilter: (state, {payload}) => {
            state.activeFilter = payload;
        },
    }
});

const {actions, reducer} = filtersSlice;

export const {filterFetchingStart, filterFetchingFinish, filterFetchingError, setActiveFilter} = actions;
export default reducer;