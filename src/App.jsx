import * as React from "react";
import { CssBaseline, Grid } from '@mui/material';
import ShopList from "./components/main/ShopList.tsx";
import Header from "./components/header/Header";

function App() {
  return (
      <React.Fragment>
        <CssBaseline enableColorScheme />
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Header/>
          </Grid>
          <Grid item container>
              <Grid item xs={2} sm={2} md={1} xl={1}/>
              <Grid item xs={10} sm={8} md={10} xl={10}>
                <ShopList/>
              </Grid>
              <Grid item xs={false} sm={2} md={1} xl={1}/> 
          </Grid>
        </Grid>
      </React.Fragment>

  );
}

export default App;
