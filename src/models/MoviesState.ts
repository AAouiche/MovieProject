import { Movie } from "./Movie";

export interface MoviesState {
    
    searchResults: Movie[];
    selectedMovie: Movie | null;
    isLoading: boolean;
    error: string | null;
    query: string | null;
  }