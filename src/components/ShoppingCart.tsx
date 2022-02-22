import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { modalStyle } from '../constants';
import ItemShopCart from './ItemShopCart';
import { useSelector } from 'react-redux';
import {
  getShopCartList,
  getShopCartTotalItems,
  getShopCartTotalPrice,
} from '../store/store';
import { ShopItem } from '../types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const shopCartList = useSelector(getShopCartList);
  const totalPrice = useSelector(getShopCartTotalPrice);
  const totalNbOfItems = useSelector(getShopCartTotalItems);
  const navigate = useNavigate();

  function createShopCartGridElement(shopCartObj: ShopItem) {
    return (
      <Grid key={shopCartObj.id} xs={12} item>
        <ItemShopCart {...shopCartObj} />
      </Grid>
    );
  }

  let buyButton: JSX.Element = <div></div>;
  let title = 'Shopping Cart Empty!';

  let totalPriceText = '';

  if (shopCartList.length) {
    title = 'Shopping Cart: ';
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
        onClick={() => navigate('/checkout')}
      >
        <ShoppingBagIcon />
        {'BUY'}
      </IconButton>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <Badge badgeContent={totalNbOfItems} color="warning">
          <ShoppingCartIcon color="secondary"></ShoppingCartIcon>
        </Badge>
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
          {buyButton}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
