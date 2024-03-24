import { useEffect } from "react";
import { useFetchMovieDetailsQuery } from "../../redux/Api/MovieApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { clearSelectedMovie } from "../../redux/Slices/MovieSlice";
import StarRating from "../Ui/stars/StarRating";
import { addWatchedMovie, deleteWatchedMovie } from "../../redux/Slices/WatchedMovieSlice";
import { Movie } from "../../models/Movie";


interface MovieDetailsProps {
    selectedId: string;
    toggleReview: () => void;
    showReview: boolean;
  }
  
  function MovieDetails({ selectedId ,toggleReview,showReview}: MovieDetailsProps) {
    
    const { data: movie, isLoading, error } = useFetchMovieDetailsQuery(selectedId);
    const watchedMovies = useSelector((state: RootState) => state.watchedMovies.watchedMovies);
    const dispatch = useDispatch<AppDispatch>();

    
    function handleClose() {
        dispatch(clearSelectedMovie());
    }
    function handleAddToWatched() {
      if (movie) {
        
        dispatch(addWatchedMovie(movie as Movie)); 
        dispatch(clearSelectedMovie());
      }
    }
    const onDeleteWatched = (id:string) => {
      dispatch(deleteWatchedMovie(id));
      console.log("pressed");
    };
    
    
    
    useEffect(() => {
      if (movie) {
        
        document.title = `Movie | ${movie.Title}`;
      }
      return () => {
        document.title = "usePopcorn"; 
      };
    }, [movie]);
  
    
    
    
    
    // if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading movie details</p>;
    if (!movie) return <div>No movie details available</div>;
    if (!selectedId) {
      
      return <p>No movie selected.</p>;
    }
    return (
      <div className="details">
        <header>
          <button onClick={handleClose} className="btn-back" >
             Close
          </button>
          <img src={movie.Poster} alt={`Poster of ${movie?.Title}`} />
          <div className="details-overview">
            <h2>{movie.Title}</h2>
            <p>{movie.released} &bull; {movie?.runtime}</p>
            <p>{movie.Genre}</p>
            <p><span>⭐️</span> {movie?.imdbRating} IMDb rating</p>
          </div>
        </header>
        <section>
          <p><em>{movie.Plot}</em></p>
          <p>Starring: {movie.Actors}</p>
          <p>Directed by: {movie.Director}</p>
          {/* <StarRating/> */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            {watchedMovies.some(x => x.imdbID === movie.imdbID) ? (
             <button onClick={() => onDeleteWatched(movie.imdbID)} className="generic-button">
              Remove from Watched
             </button>
            ) : (
              <button onClick={handleAddToWatched} className="generic-button">
                Add to Watched
              </button>
  )}

       <button onClick={toggleReview} className="generic-button">
          {showReview ? 'Hide Reviews' : 'Show Reviews'}
       </button>
       </div>
          {/* <button onClick={handleAddToWatched} className="add-to-watched">
          Add to Watched
          </button> */}
        </section>
        
      </div>
    );
  }
  
  export default MovieDetails;