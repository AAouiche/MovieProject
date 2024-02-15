import { MovieReview } from "./MovieReview";

export interface Movie {
  imdbID: string; 
  Title: string;
  Year: string;
  Poster: string;
  Genre?: string;
  Director?: string;
  runtime?: string;
  Actors?: string;
  Plot?: string;
  released?: string;
  imdbRating?: string;
  Reviews?: MovieReview[];
}