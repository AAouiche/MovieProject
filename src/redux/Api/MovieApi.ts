import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../models/Movie';


const KEY = import.meta.env.VITE_MOVIE_API_KEY;
export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    endpoints: (builder) => ({
      fetchMovies: builder.query<Movie[], string>({
        query: (query) => `?apikey=${KEY}&s=${query}`,
        transformResponse: (response: { Search: Movie[] }) => response.Search,
      }),
      fetchMovieDetails: builder.query<Movie, string>({
        query: (movieId) => `?apikey=${KEY}&i=${movieId}`,
      }),
    }),
  });

export const { useFetchMoviesQuery, useFetchMovieDetailsQuery } = movieApi;
export default movieApi;