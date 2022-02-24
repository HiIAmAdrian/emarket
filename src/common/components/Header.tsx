import { AppBar, Toolbar } from '@mui/material';
import BasicMenu from './BasicMenu';
import ShoppingCart from './ShoppingCart';
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';
import React from 'react';
import FavoriteList from './FavoriteList';
import { Box } from '@mui/system';

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
