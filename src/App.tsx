import { useEffect, useState } from 'react';

import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import {  AppDispatch, RootState} from './redux/Store';
import NavBar from './Components/Ui/NavBar';

import Search from './Components/Ui/Search';

import { ToastContainer } from 'react-toastify';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import HomePage from './Components/Ui/Home/Home';
import { fetchUserData } from './redux/Slices/UserSlice';
import Loader from './Components/Ui/Loader';


function App() {
  
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  useEffect(() => {
    
      dispatch(fetchUserData());
    
  }, [isLoggedIn, dispatch]);


  if(isLoading){
    return <Loader/>;
  }

  if(isLoggedIn && location.pathname ==='/'){
    return <Navigate to="/dashboard"/>
  }
  const showNavBar = location.pathname !== '/login' && location.pathname !== '/register';

  

  return (
    <>
      <ToastContainer position='bottom-right'/>
      {location.pathname === '/' ? <HomePage/> :(
        <div className="App">
          {showNavBar && (
            <NavBar>
              <Search />
            </NavBar>
          )}
          <Outlet />
        </div>
      )}
    </>
  );
}

export default App;