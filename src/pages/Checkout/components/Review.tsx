import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  getCustomerAdress,
  getPaymentDetailObject,
  getShopCartList,
  getShopCartTotalPrice,
} from '../../../store/store';

export default function Review() {
  const products = useSelector(getShopCartList);
  const total = useSelector(getShopCartTotalPrice);
  const address = useSelector(getCustomerAdress);
  const paymentDetails = useSelector(getPaymentDetailObject);
  const addressJSX: JSX.Element[] = [];

  const payments = [
    { name: 'Card holder:', detail: paymentDetails.cardHolder },
    { name: 'Card number:', detail: paymentDetails.cardNumber },
    { name: 'Expiry date:', detail: paymentDetails.expiryDate },
  ];

  for (const item of Object.values(address)) {
    addressJSX.push(<Typography key={Math.random()}>{item}</Typography>);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.title}
              secondary={product.category}
            />
            <Typography variant="body2">
              {(product.price * product.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total.toFixed(2)} lei
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {addressJSX}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
