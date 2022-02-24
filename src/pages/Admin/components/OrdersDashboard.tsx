import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getOrders } from '../../../common/services/storageHandler';
import Title from './Title';

export default function Orders() {
  const orderList = getOrders();
  const title = orderList.length ? 'Recent Orders' : 'No Orders Placed';

  return (
    <React.Fragment>
      <Title>{title}</Title>
      {orderList.length ? (
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((row, index) => {
                if (index > 5) return;

                return (
                  <TableRow key={Math.random()}>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.paymentDetails.cardHolder}</TableCell>
                    <TableCell>{'card'}</TableCell>
                    <TableCell align="right">{`${row.total.toFixed(
                      2
                    )} Lei`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Link
            sx={{ textDecoration: 'none' }}
            component={RouterLink}
            to="orders"
          >
            See more orders
          </Link>
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
