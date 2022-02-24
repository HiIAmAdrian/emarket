import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ADMIN, LOGGED, USER } from '../variables/constants';
import { logout } from '../../store/reducerAuth';
import { getUserAuthState, getUserRole } from '../../store/store';
import theme from '../../theme';
import ShoppingCart from './ShoppingCart';

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

  if (isLoggedIn === LOGGED && userRole === ADMIN) {
    conditionalMenu.push(
      <MenuItem onClick={handleClose} key={Math.random()}>
        <Link
          sx={{ textDecoration: 'none' }}
          component={RouterLink}
          to="/admin"
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
  } else if (isLoggedIn === LOGGED && userRole === USER) {
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
