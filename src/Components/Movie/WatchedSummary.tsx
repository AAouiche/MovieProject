
import { useSelector } from 'react-redux';



import { RootState } from '../../redux/Store';
import WatchedMoviesList from './WatchedMovieList';

function WatchedSummary() {
    const watchedMovies = useSelector((state: RootState) => state.watchedMovies.watchedMovies);
    const average = (arr: number[]): number => {
      if (arr.length === 0) return 0; 
  
      const sum = arr.reduce((acc, val) => acc + val, 0);
      return sum / arr.length;
   };
   const avgImdbRating = average(
    watchedMovies.map((movie) => movie.imdbRating ? parseFloat(movie.imdbRating) : 0)
  );

   const avgRuntime = average(
    watchedMovies.map((movie) => movie.runtime ? parseFloat(movie.runtime) : 0)
   );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p><span>#️⃣</span><span>{watchedMovies.length} movies</span></p>
        <p><span>⭐️</span><span>{avgImdbRating.toFixed(2)}</span></p>
        
        <p><span>⏳</span><span>{avgRuntime}</span></p>
        
      </div>
      <WatchedMoviesList />
    </div>
  );
}

export default WatchedSummary;