import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { clearSearchResults, setQuery } from "../../redux/Slices/MovieSlice";


  
  function Search() {
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector((state:any) => state.movies.query); 
    const inputEl = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Enter" && document.activeElement !== inputEl.current) {
          inputEl.current?.focus();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
  
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(e.target.value)); 
      if (e.target.value === '') {
        
        dispatch(clearSearchResults());
      }
    };
  
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleQueryChange}
        ref={inputEl}
      />
    );
  }
  
  export default Search;