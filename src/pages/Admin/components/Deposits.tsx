import Typography from '@mui/material/Typography';
import * as React from 'react';
import { getOrders } from '../../../common/services/storageHandler';
import Title from './Title';

export default function Deposits() {
  const orderList = getOrders();
  let totalDeposit = 0;
  for (const item of orderList) {
    totalDeposit += item.total;
  }

  return (
    <React.Fragment>
      <Title>Total Sold</Title>
      <Typography component="p" variant="h4">
        {totalDeposit} Lei
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on{' '}
        {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
      </Typography>
    </React.Fragment>
  );
}
