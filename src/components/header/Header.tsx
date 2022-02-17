import { AppBar, Icon } from "@mui/material";
import BasicMenu from "./BasicMenu";
import ShoppingCart from "./ShoppingCart";

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
          <Icon sx={{
            height: 60,
            width: 60,
          }}>
            <img src={"https://cdn.cdnlogo.com/logos/s/47/shop-and-save.svg"} alt="dadadaOteluEViataMea" />
          </Icon>
          <ShoppingCart />
        </AppBar>
       );
}

export default Header;