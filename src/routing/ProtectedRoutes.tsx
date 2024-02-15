import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/Store";

export default function PrivateRoute() {
  
  const isLoggedIn = useSelector((state :RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    console.log('Redirecting to /login');
    return <Navigate to="/login" />;
  }

  console.log('Rendering Outlet');
  return <Outlet />;
}