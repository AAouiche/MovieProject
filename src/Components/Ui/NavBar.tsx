import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import Logo from "./Logo";
import { logout } from "../../redux/Slices/UserSlice";


interface NavBarProps {
    children: React.ReactNode;
  }
  
  function NavBar({ children }: NavBarProps) {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
      dispatch(logout());
    };
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
        {user.isLoggedIn && (
        <div>
          <span>Welcome, {user.user?.UserName}!</span>
          <button onClick={handleLogout}>LogOut</button>
        </div>
         ) }
      </nav>
    );
  }
  
  export default NavBar;