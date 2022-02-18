import { AppBar } from "@mui/material";
import BasicMenu from "./BasicMenu";
import ShoppingCart from "./ShoppingCart";
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';

function Header() {
    return (  
        <AppBar
          sx={{
            display: "flex-row",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection:"row"
          }}
          position="static"
        >
          <BasicMenu />
          <StorefrontSharpIcon/>
          <ShoppingCart />
        </AppBar>
       );
}

export default Header;