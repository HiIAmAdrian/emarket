import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducerAuth';
import { getUserAuthState } from '../../redux/store';
import { LOGGED_IN } from '../../constants';
import { Button, Menu, MenuItem } from '@mui/material';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getUserAuthState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let conditionalMenu: JSX.Element;

  if (isLoggedIn === LOGGED_IN) {
    conditionalMenu = (
      <MenuItem
        onClick={() => {
          dispatch(logout);
          console.log('da ba');
          setAnchorEl(null);
        }}
      >
        Logout
      </MenuItem>
    );
  } else {
    conditionalMenu = (
      <div>
        <MenuItem onClick={handleClose}>
          <Link to="/login">Log In</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/signup">Sign Up</Link>
        </MenuItem>
      </div>
    );
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon color="secondary"></MenuIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/products">Products</Link>
        </MenuItem>
        {conditionalMenu}
      </Menu>
    </div>
  );
}
