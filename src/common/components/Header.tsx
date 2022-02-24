import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';
import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BasicMenu from './BasicMenu';
import FavoriteList from './FavoriteList';
import ShoppingCart from './ShoppingCart';

function Header() {
  return (
    <React.Fragment>
      <AppBar
        sx={{
          display: 'flex-row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: '60px',
        }}
        position="fixed"
      >
        <BasicMenu />
        <StorefrontSharpIcon />
        <Box>
          <FavoriteList />
          <ShoppingCart />
        </Box>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
