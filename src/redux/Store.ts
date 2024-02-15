import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit';
import moviesReducer from './Slices/MovieSlice';
import userReducer from './Slices/UserSlice';
import watchedMoviesReducer from './Slices/WatchedMovieSlice';
import reviewReducer from './Slices/MovieReviewSlice';
import movieApi from './Api/MovieApi';


const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    watchedMovies : watchedMoviesReducer,
    movieReview : reviewReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;

