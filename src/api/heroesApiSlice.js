import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const heroesApiSlice = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['heroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: (activeFilter) => `/heroes${activeFilter !== 'all' ? `?element=${activeFilter}` : ''}`,
            providesTags: ['heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['heroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['heroes']
        })
    })
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = heroesApiSlice;
