import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Customer } from '../../store/reducerCustomers';
import { getCustomersList } from '../../store/store';
import CustomerCard from './components/CustomerCard';

function CustomersPage() {
  const list = useSelector(getCustomersList);

  const getCustomerCard = (customerObj: Customer) => (
    <Grid
      sx={{ display: 'flex' }}
      key={customerObj.id}
      item
      xs={10}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <CustomerCard {...customerObj} />
    </Grid>
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Grid item xs={2} sm={2} md={1} xl={1} />
        <Grid item xs={10} sm={8} md={10} xl={10}>
          <Grid container spacing={2}>
            {list.map((customer) => getCustomerCard(customer))}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} md={1} xl={1} />
      </Grid>
    </Grid>
  );
}

export default CustomersPage;
