import * as React from "react";
import BasicMenu from "./components/header/BasicMenu.tsx";
import ShoppingCart from "./components/header/ShoppingCart.tsx";
import { Icon, Box, CssBaseline } from '@mui/material';
import ShopList from "./components/main/ShopList.tsx";

function App() {
  return (
    <div className="App">
      <CssBaseline enableColorScheme />
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: 1,
        borderColor: 'primary.main'
      }}>
        <BasicMenu />
        <Icon sx={{
          height: 60,
          width: 60,
        }}>
          <img src={"https://cdn.cdnlogo.com/logos/s/47/shop-and-save.svg"} alt="dadadaOteluEViataMea" />
        </Icon>
        <ShoppingCart />
      </Box>
      <ShopList></ShopList>
    </div>
  );
}

export default App;
