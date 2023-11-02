import {configureStore} from "@reduxjs/toolkit";
import filters from "./slices/filtersSlice";
import {heroesApiSlice} from "../api/heroesApiSlice";
import {filtersApiSlice} from "../api/filtersApiSlice";

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
}

const store = configureStore({
    reducer: {filters, [heroesApiSlice.reducerPath]:heroesApiSlice.reducer, [filtersApiSlice.reducerPath]:filtersApiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, heroesApiSlice.middleware, filtersApiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;