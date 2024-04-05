import React from "react";
import "../Navigation/Nav.css";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineHome } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import Logo from "../../assets/logo.png";

const Nav = ({ search, setSearch, setShowMenu, profileImg }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let userData = useSelector((state) => state?.login?.users);
  const tooltip = (
    <></>
    // <Tooltip id="home-tooltip">Home</Tooltip>
  );
  return (
    <nav>
      <div className="n-logo" style={{ display: "flex" }}>
        <img
          src={Logo}
          alt="logo"
          style={{ width: "62px", marginRight: "10px", height: "40px" }}
        />
        <Link
          to="/home"
          className="logo"
          style={{ color: "black", textDecoration: "none" }}
        >
          <h1>SAGAR <span>ENGAGE</span></h1>
        </Link>
      </div>

      <div className="n-form-button"></div>

      <div className="social-icons">
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <AiOutlineHome className="nav-icons" title="Home"/>
        </Link>

        <Link to="/notification" id="notifi" style={{ marginTop: "8px" }}>
          <IoNotificationsOutline className="nav-icons" title="Notification"/>
          <span>5</span>
        </Link>

        <TbMessage className="nav-icons" title="Chat"/>
        <LiaUserFriendsSolid
          className="nav-icons"
          onClick={() => setShowMenu(true)}
          title="Groups"
        />
      </div>

      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>{userData.name[0]}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/profile">
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Nav;
