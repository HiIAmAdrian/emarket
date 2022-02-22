import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { modalStyle } from '../../constants';
import ItemShopCart from './ItemShopCart';
import { useSelector } from 'react-redux';
import { getShopCartList } from '../../redux/store';
import { ShopItem } from '../../types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function ShoppingCart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const shopCartList = useSelector(getShopCartList);

  let totalPrice = 0;
  for (let i = 0; i < shopCartList.length; i++) {
    totalPrice += shopCartList[i].price * shopCartList[i].quantity;
  }

  function createShopCartGridElement(shopCartObj: ShopItem) {
    return (
      <Grid key={shopCartObj.id} xs={12} item>
        <ItemShopCart {...shopCartObj} />
      </Grid>
    );
  }

  let buyButton: JSX.Element = <p></p>;
  let title = (
    <p>
      Shopping Cart Empty <SentimentVeryDissatisfiedIcon />
    </p>
  );

  let totalPriceText = '';

  if (shopCartList.length) {
    title = <p>Shopping Cart:</p>;
    totalPriceText = 'TOTAL: ' + totalPrice.toFixed(2) + ' lei';
    buyButton = (
      <IconButton
        sx={{
          float: 'right',
          color: 'green',
          transform: 'scale(2)',
          marginRight: '30px',
          marginTop: '20px',
        }}
      >
        <ShoppingBagIcon />
        {'BUY'}
      </IconButton>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <ShoppingCartIcon color="secondary"></ShoppingCartIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
            </Grid>
            {shopCartList.map((shopCartObj) =>
              createShopCartGridElement(shopCartObj)
            )}
          </Grid>
          <Typography
            sx={{
              marginTop: '30px',
              float: 'left',
            }}
            variant="h4"
          >
            {totalPriceText}
          </Typography>
          <Typography>{buyButton}</Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
