import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

// let api_key = 

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key",import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => ("/charts/world")}),
        getSongsByGenre: builder.query({query: (({genreListId}) => (`/charts/genre-world?genre_code=${genreListId.toUpperCase()}`))}),
        getSongDetails: builder.query({query: (({songid}) => (`/tracks/details?track_id=${songid}`))}),
        getSongRelated : builder.query({query: (({songid}) => (`/tracks/related?track_id=${songid}`))}),
        getArtistDetails : builder.query({query: ((artistid) => (`/artists/details?artist_id=${artistid}`))}),
        getSongByCountry : builder.query({query: ((countrycode) => (`/charts/country?country_code=${countrycode}`))}),
        getSongBySearch : builder.query({query: ((search_query) => (`/search/multi?search_type=SONGS_ARTISTS&query=${search_query}`))})
    })
})


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongBySearchQuery
} = shazamCoreApi