import { AppBar, Toolbar } from '@mui/material';
import BasicMenu from './BasicMenu';
import ShoppingCart from './ShoppingCart';
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';
import React from 'react';

function Header() {
  return (
    <React.Fragment>
      <AppBar
        sx={{
          display: 'flex-row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        position="fixed"
      >
        <BasicMenu />
        <StorefrontSharpIcon />
        <ShoppingCart />
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
