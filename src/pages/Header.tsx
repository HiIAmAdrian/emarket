import { AppBar, Toolbar } from '@mui/material';
import BasicMenu from '../components/BasicMenu';
import ShoppingCart from '../components/ShoppingCart';
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
          height: '60px',
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
