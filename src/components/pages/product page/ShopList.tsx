import React from 'react';
import { getShopList } from '../../../redux/store';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { Grid } from '@mui/material';
import { ShopItem } from '../../../types';
import Header from '../../header/Header';

function ShopList() {
  const list = useSelector(getShopList);

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
      <ItemCard {...shopCardObj} />
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
    </Grid>
  );
}

export default ShopList;
