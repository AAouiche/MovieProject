import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";

import { logout } from "../../redux/Slices/UserSlice";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";


interface NavBarProps {
    children: React.ReactNode;
  }
  
  function NavBar({ children }: NavBarProps) {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      handleClose();
      dispatch(logout());
    };
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleProfile = () =>{
      handleClose();
      navigate("/profile");
    }
  
  
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
        {user.isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.user?.ImageUrl} alt={user.user?.UserName} />
            <span style={{ marginLeft: '10px' }}>Welcome, {user.user?.UserName}!</span>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenu} size="small" sx={{ ml: 2, color: 'gray' }}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              
            >
              
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </nav>
    );
  }
  
  export default NavBar;