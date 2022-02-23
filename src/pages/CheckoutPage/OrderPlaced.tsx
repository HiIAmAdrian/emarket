import { Button, Container, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ textAlign: 'center', marginTop: '100px' }} variant="h1">
        Order Placed Successfully!
      </Typography>

      <Button
        sx={{ margin: 'auto', marginTop: '100px' }}
        variant="contained"
        onClick={() => navigate('/products')}
      >
        Return To Main Menu
      </Button>
    </Container>
  );
}

export default OrderPlaced;
