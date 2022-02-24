import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { getOrders } from '../../../services/storageHandle';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

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
