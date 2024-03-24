import { useDispatch } from "react-redux";
import { Movie } from "../../models/Movie";
import { AppDispatch } from "../../redux/Store";
import { deleteWatchedMovie } from "../../redux/Slices/WatchedMovieSlice";
import { setSelectedMovie } from "../../redux/Slices/MovieSlice";

interface WatchedMovieProps {
    movie: Movie;
    
}

function WatchedMovie({ movie }:WatchedMovieProps) {

    const dispatch = useDispatch<AppDispatch>();
   

    const handleSelectMovie = (imdbID: Movie) => {
     dispatch(setSelectedMovie(imdbID));
    };

    const onDeleteWatched = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        dispatch(deleteWatchedMovie(id));
        console.log("pressed");
    };
    return (
        <li onClick={() =>handleSelectMovie(movie)} className="watched-movie-item">
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <div>
                    <p><span>⭐️</span> {movie.imdbRating}</p>
                    
                    <p><span>⏳</span> {movie.runtime} min</p>
                </div>
            </div>
            <button onClick={(e) => onDeleteWatched(movie.imdbID, e)} 
                className="generic-button"
            >
                Remove
            </button>
        </li>
    );
}

export default WatchedMovie;