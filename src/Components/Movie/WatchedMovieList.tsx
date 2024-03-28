
import { useSelector } from 'react-redux';

import WatchedMovie from './WatchedMovie';
import {  RootState } from '../../redux/Store';


function WatchedMoviesList() {
  const watchedMovies = useSelector((state: RootState) => state.watchedMovies.watchedMovies);
  
  console.log("watchedList",watchedMovies);
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
         
        />
      ))}
    </ul>
  );
}



export default WatchedMoviesList;