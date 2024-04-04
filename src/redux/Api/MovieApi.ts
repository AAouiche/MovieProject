import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../models/Movie';


const KEY = import.meta.env.VITE_MOVIE_API_KEY;
const URL = 'https://www.omdbapi.com/';
export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
      fetchMovies: builder.query<Movie[], string>({
        query: (query) => {
          const url = `?apikey=${KEY}&s=${query}`;
          console.log('Fetching movies with URL:', URL); 
          return url;
      },
        transformResponse: (response: { Search: Movie[] }) => response.Search,
      }),
      fetchMovieDetails: builder.query<Movie, string>({
        query: (movieId) => `?apikey=${KEY}&i=${movieId}`,
      }),
    }),
  });

export const { useFetchMoviesQuery, useFetchMovieDetailsQuery } = movieApi;
export default movieApi;