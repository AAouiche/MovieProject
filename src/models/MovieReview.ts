import { Movie } from "./Movie";
import { User } from "./User";

export interface MovieReview {
    reviewId: number;
    userId: string;
    movieId: string;
    content: string;
    rating: number;
    reviewDate: Date;
    user: User;
    movie: Movie;
  }