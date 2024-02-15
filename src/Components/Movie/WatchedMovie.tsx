import { useDispatch } from "react-redux";
import { Movie } from "../../models/Movie";
import { AppDispatch } from "../../redux/Store";
import { deleteWatchedMovie } from "../../redux/Slices/WatchedMovieSlice";

interface WatchedMovieProps {
    movie: Movie;
    onDeleteWatched?: (id: string) => void;
}

function WatchedMovie({ movie }:WatchedMovieProps) {

    const dispatch = useDispatch<AppDispatch>();

  const onDeleteWatched = (id:string) => {
    dispatch(deleteWatchedMovie(id));
    console.log("pressed");
  };
    return (
        <li className="watched-movie-item">
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <div>
                    <p><span>⭐️</span> {movie.imdbRating}</p>
                    
                    <p><span>⏳</span> {movie.runtime} min</p>
                </div>
            </div>
            <button onClick={() => onDeleteWatched(movie.imdbID)} 
                className="btn-delete-watched-movie"
            >
                Remove
            </button>
        </li>
    );
}

export default WatchedMovie;