const {createSlice} = require("@reduxjs/toolkit");

const initialState = {
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilter: (state, {payload}) => {
            state.activeFilter = payload;
        },
    }
});

const {actions, reducer} = filtersSlice;
export const {setActiveFilter} = actions;
export default reducer;