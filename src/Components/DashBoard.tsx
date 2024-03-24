import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useFetchMoviesQuery } from "../redux/Api/MovieApi";

import Main from "./Ui/Main";
import CustomBox from "./Ui/CustomBox";
import Loader from "./Ui/Loader";
import MovieList from "./Movie/MovieList";
import ErrorMessage from "./Ui/ErrorMessage";
import MovieDetails from "./Movie/MovieDetails";

import WatchedSummary from "./Movie/WatchedSummary";
import { fetchWatchedMovies } from "../redux/Slices/WatchedMovieSlice";
import AddReviewForm from "./Review/ReviewForm";
import MovieReviewsList from "./Review/MovieReviewList";



function DashBoard() {
  
  const selectedMovieId = useSelector((state: RootState) => state.movies.selectedMovie?.imdbID);
  const query = useSelector((state:any) => state.movies.query); 
  const { data: movies, isLoading, error } = useFetchMoviesQuery(query);
  const dispatch = useDispatch<AppDispatch>();
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

    useEffect(() => {
        dispatch(fetchWatchedMovies());
    }, [dispatch]);
    useEffect(()=>{
      console.log("selected: ",selectedMovieId);
    },[selectedMovieId])
    console.log("Movies:", movies);

  return (
    <>
      
      <Main>
      {movies && (
        <CustomBox>
        
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies}  />
        )}
        {error && <ErrorMessage message={error} />}
      </CustomBox>
      )}
      {selectedMovieId ? (
        <>
        <CustomBox>
          <MovieDetails selectedId={selectedMovieId} toggleReview={toggleReviews} showReview={showReviews}/>
          <AddReviewForm  movieId={selectedMovieId} />
          {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
           <button onClick={toggleReviews} style={{ margin: '0 auto' }} className="generic-button">
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
           </button>
          </div> */}
        </CustomBox>
    
        
    
        {showReviews && (
          <CustomBox >
            
            <MovieReviewsList movieId={selectedMovieId} />
          </CustomBox>
        )}
      </>
        ) : (
          <>
            <WatchedSummary />
            {/* <WatchedMoviesList /> */}
          </>
        )}
      </Main>
    </>
  );
}

export default DashBoard;