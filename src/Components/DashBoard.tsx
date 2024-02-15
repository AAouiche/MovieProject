import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useFetchMoviesQuery } from "../redux/Api/MovieApi";
import NavBar from "./Ui/NavBar";
import Search from "./Ui/Search";
import Main from "./Ui/Main";
import Box from "./Ui/Box";
import Loader from "./Ui/Loader";
import MovieList from "./Movie/MovieList";
import ErrorMessage from "./Ui/ErrorMessage";
import MovieDetails from "./Movie/MovieDetails";
import WatchedMoviesList from "./Movie/WatchedMovieList";
import WatchedSummary from "./Movie/WatchedSummary";
import { fetchWatchedMovies } from "../redux/Slices/WatchedMovieSlice";


function DashBoard() {
  
  const selectedMovieId = useSelector((state: RootState) => state.movies.selectedMovie?.imdbID);
  const query = useSelector((state:any) => state.movies.query); 
  const { data: movies, isLoading, error } = useFetchMoviesQuery(query);
  const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchWatchedMovies());
    }, [dispatch]);
    useEffect(()=>{
      console.log(selectedMovieId);
    },[selectedMovieId])
    console.log("Movies:", movies);

  return (
    <>
      
      <Main>
      {movies && (
        <Box>
        
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MovieList movies={movies}  />
        )}
        {error && <ErrorMessage message={error} />}
      </Box>
      )}
      {selectedMovieId ?(
      <Box>
      
       <MovieDetails selectedId = {selectedMovieId}/>
      
          
      </Box>
      ):(
        <>
          <WatchedSummary />
          {/* <WatchedMoviesList /> */}
       </>
      ) } 
      </Main>
    </>
  );
}1

export default DashBoard;