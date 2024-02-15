import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { Movie } from '../../models/Movie';
import { MoviesState } from '../../models/MoviesState';


const KEY = import.meta.env.VITE_MOVIE_API_KEY;
const URL = `http://www.omdbapi.com/?apikey=${KEY}&i=`;
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}${movieId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: MoviesState = {
  searchResults: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
  query:''
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie(state, action: PayloadAction<Movie>) {
      // const movie = state.searchResults.find(m => m.imdbID === action.payload);
      state.selectedMovie = action.payload || null;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    setQuery(state, action: PayloadAction<string>){
      state.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch movie details';
      });
  },
});

  

export const { setSelectedMovie, clearSelectedMovie, clearSearchResults,setQuery } = moviesSlice.actions;
export default moviesSlice.reducer;