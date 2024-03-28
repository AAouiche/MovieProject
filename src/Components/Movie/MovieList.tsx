
import {  useDispatch } from 'react-redux';
import MovieComponent from './Movie';
import { Movie } from '../../models/Movie';
import { setSelectedMovie } from '../../redux/Slices/MovieSlice';




type MovieListProps = {
  movies: Movie[];
};

function MovieList({ movies }: MovieListProps) {
  const dispatch = useDispatch();

  const handleSelectMovie = (imdbID: Movie) => {
    dispatch(setSelectedMovie(imdbID));
  };

  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieComponent key={movie.imdbID} movie={movie} onSelectMovie={handleSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;