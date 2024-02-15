import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/Agent";
import { Movie } from "../../models/Movie";


export const fetchWatchedMovies = createAsyncThunk(
    'watchedMovies/fetch',
    async (_, { rejectWithValue }) => {
        try {
            
            const movies = await agent.MovieService.listWatchedMovies();
            console.log("Fetched watched movies:", movies);
            return movies; 
        } catch (error) {
            console.error("Error fetching watched movies:", error);
           
            return rejectWithValue((error as Error).message);
        }
    }
);
  
  export const addWatchedMovie = createAsyncThunk(
    'watchedMovies/add',
    async (movie : Movie, { rejectWithValue }) => {
      try {
        await agent.MovieService.addWatchedMovie(movie);
        return movie;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  
  interface WatchedMoviesState {
    watchedMovies: Movie[];
    isLoading: boolean;
    error: unknown;
  }
  
  const initialState: WatchedMoviesState = {
    watchedMovies: [],
    isLoading: false,
    error: null as unknown
  };
  
  const watchedMoviesSlice = createSlice({
    name: 'watchedMovies',
    initialState,
    reducers: {
      setWatchedMovies: (state, action: PayloadAction<Movie[]>) => {
        state.watchedMovies = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchWatchedMovies.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
          state.isLoading = false;
          
          state.watchedMovies = action.payload;
          console.log("state",state.watchedMovies);
        })
        .addCase(fetchWatchedMovies.rejected, (state, action) => {
          state.isLoading = false;
          
          state.error = action.payload;
        })
        .addCase(addWatchedMovie.fulfilled, (state, action) => {
          state.watchedMovies.push(action.payload);
        })
        
        .addCase(deleteWatchedMovie.fulfilled, (state, action: PayloadAction<string>) => {
          state.watchedMovies = state.watchedMovies.filter(
            (movie) => movie.imdbID !== action.payload
          );
        });
        
    },
  });
  
  export default watchedMoviesSlice.reducer;
  export const deleteWatchedMovie = createAsyncThunk(
    'watchedMovies/delete',
    async (movieId:string, { rejectWithValue }) => {
      try {
        await agent.MovieService.deleteWatchedMovie(movieId);
        return movieId;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );