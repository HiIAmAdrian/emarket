import React from 'react';
import { getShopList } from '../../redux/store';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { Grid } from '@mui/material';
import { ShopItem } from '../../types';

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
    <Grid container spacing={2}>
      {list.map((shopCardObj) => getShopItemCard(shopCardObj))}
    </Grid>
  );
}

export default ShopList;
