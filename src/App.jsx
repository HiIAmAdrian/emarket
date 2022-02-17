import * as React from "react";
import { CssBaseline, Grid } from '@mui/material';
import ShopList from "./components/main/ShopList.tsx";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <CssBaseline enableColorScheme />
      <Grid container direction="column">
        <Grid item>
         <Header/>
        </Grid>
        <Grid item>
          <Grid item sm={2}/>
          <ShopList/>
          <Grid item sm={2}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
