import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { getOrders } from '../../services/storageHandle';
import Title from './components/Title';

export default function OrdersPage() {
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
              {orderList.map((row) => (
                <TableRow key={Math.random()}>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.paymentDetails.cardHolder}</TableCell>
                  <TableCell>{'card'}</TableCell>
                  <TableCell align="right">{`${row.total.toFixed(
                    2
                  )} Lei`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
