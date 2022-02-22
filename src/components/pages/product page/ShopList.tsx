import React from 'react';
import { getShopList } from '../../../redux/store';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { Alert, Grid } from '@mui/material';
import { ShopItem } from '../../../types';
import Header from '../../header/Header';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ShopList() {
  const list = useSelector(getShopList);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getShopItemCard = (shopCardObj: ShopItem) => (
    <Grid
      sx={{ display: 'flex' }}
      key={shopCardObj.id}
      item
      xs={10}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <ItemCard {...shopCardObj} handleClick={handleClick} />
    </Grid>
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={2} sm={2} md={1} xl={1} />
        <Grid item xs={10} sm={8} md={10} xl={10}>
          <Grid container spacing={2}>
            {list.map((shopCardObj) => getShopItemCard(shopCardObj))}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} md={1} xl={1} />
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Item added to cart!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default ShopList;
