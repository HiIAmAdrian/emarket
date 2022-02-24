import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getShopCartList,
  getShopCartTotalItems,
  getShopCartTotalPrice,
} from '../../store/store';
import { ShopItem } from '../variables/types';
import ItemOnList from './ItemOnList';

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
        <ItemOnList shopItem={shopCartObj} modalType="cart" />
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    maxHeight: '80%',
    overflow: 'scroll',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
            <Grid item sx={{ margin: 'auto' }}>
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
