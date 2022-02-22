import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducerAuth';
import { getUserAuthState, getUserRole } from '../../redux/store';
import { ADMIN, LOGGED_IN, USER } from '../../constants';
import { Button, Menu, MenuItem } from '@mui/material';
import theme from '../../theme';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getUserAuthState);
  const navigate = useNavigate();
  const userRole = useSelector(getUserRole);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const conditionalMenu: JSX.Element[] = [];

  if (isLoggedIn === LOGGED_IN && userRole === ADMIN) {
    conditionalMenu.push(
      <MenuItem onClick={handleClose} key={Math.random()}>
        <Link
          sx={{ textDecoration: 'none' }}
          component={RouterLink}
          to="/dashboard"
        >
          Dashboard
        </Link>
      </MenuItem>
    );
    conditionalMenu.push(
      <MenuItem
        key={Math.random()}
        onClick={() => {
          dispatch(logout());
          navigate('/products');
          setAnchorEl(null);
        }}
        style={{ color: theme.palette.primary.main }}
      >
        Logout
      </MenuItem>
    );
  } else if (isLoggedIn === LOGGED_IN && userRole === USER) {
    conditionalMenu.push(
      <MenuItem
        key={Math.random()}
        onClick={() => {
          dispatch(logout());
          navigate('/products');
          setAnchorEl(null);
        }}
        style={{ color: theme.palette.primary.main }}
      >
        Logout
      </MenuItem>
    );
  } else {
    conditionalMenu.push(
      <MenuItem onClick={handleClose} key={Math.random()}>
        <Link
          sx={{ textDecoration: 'none' }}
          component={RouterLink}
          to="/login"
        >
          Log In
        </Link>
      </MenuItem>
    );
    conditionalMenu.push(
      <MenuItem key={Math.random()} onClick={handleClose}>
        <Link
          sx={{ textDecoration: 'none' }}
          component={RouterLink}
          to="/signup"
        >
          Sign Up
        </Link>
      </MenuItem>
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
          <Link
            component={RouterLink}
            sx={{ textDecoration: 'none' }}
            to="/products"
          >
            Products
          </Link>
        </MenuItem>
        {conditionalMenu}
      </Menu>
    </div>
  );
}
