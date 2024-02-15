
import { Movie } from '../../models/Movie';




interface MovieComponentProps {
  movie: Movie;
  onSelectMovie: (imdbID: Movie) => void;
}

function MovieComponent({ movie, onSelectMovie }: MovieComponentProps) {
  const handleClick = () => {

    onSelectMovie(movie);
    console.log("test");
  };

  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </li>
  );
}

export default MovieComponent;