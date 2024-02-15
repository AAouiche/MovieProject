import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import PublicRoute from "./PublicRoutes";

import PrivateRoute from "./ProtectedRoutes";
import MovieList from "../Components/Movie/MovieList";
import Login  from "../Components/Auth/Login";
import NotFound from "../Components/Ui/errors/NotFound";
import DashBoard from "../Components/DashBoard";
import RegistrationForm from "../Components/Auth/Register";
import BasicForm from "../Components/Auth/Basic";

export const routes: RouteObject[] = [
    {
      path: '/',
      element: <App/>,
      children: [
        {
            path: '/',
            element: <PublicRoute />,
            children: [
              { path: 'login', element: <Login bool={true}/> },
              { path: 'register', element: <Login bool={false}/> }
            ]
          },
          {
            path: '/dashboard',
            element: <PrivateRoute />,
            children: [
              { index: true, element: <DashBoard  /> }
            ]
          },
        { path: 'not-found', element: <NotFound /> },
        { path: '*', element: <Navigate replace to='/not-found' /> },
       // { path:'dashboard',element:<DashBoard query={""} />}
      ]
    }
  ];
  
  export const router = createBrowserRouter(routes);