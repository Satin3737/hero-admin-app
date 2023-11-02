import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const filtersApiSlice = createApi({
    reducerPath: 'filtersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: builder => ({
        getFilters: builder.query({
            query: () => '/filters',
        })
    })
});

export const {useGetFiltersQuery} = filtersApiSlice;
