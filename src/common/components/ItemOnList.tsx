import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteFromShoppingCart,
  setQuantityOfProduct,
} from '../../store/reducerAuth';
import { deleteFromFavorites } from '../../store/reducerFavorites';
import { SetQuantity, ShopItem } from '../variables/types';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface ItemOnListProps {
  shopItem: ShopItem;
  modalType: 'favorite' | 'cart';
}

export default function ItemOnList({ shopItem, modalType }: ItemOnListProps) {
  const { id, title, price, image, quantity } = shopItem;
  const [totalPrice, setTotalPrice] = useState(price);
  const dispatch = useDispatch();

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setQuantityOfProduct({
        id: id,
        quantity: +e.currentTarget.value,
      } as SetQuantity)
    );
    setTotalPrice(price * +e.currentTarget.value);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <CardMedia
        sx={{
          objectFit: 'contain',
          maxWidth: '20%',
        }}
        component="img"
        height="100"
        width="20%"
        image={image}
        alt={title}
      />
      <CardHeader sx={{ width: '100%' }} action={null} title={title} />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          justifySelf: 'end',
        }}
      >
        {modalType === 'cart' ? (
          <React.Fragment>
            <Typography
              sx={{ marginRight: '15px' }}
              align="center"
              variant="h6"
            >
              {totalPrice.toFixed(2)}
            </Typography>
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              onChange={handleQuantity}
              sx={{ width: 71, justifySelf: 'end' }}
              defaultValue={quantity}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]', min: '1' }}
            />
          </React.Fragment>
        ) : (
          ''
        )}

        <IconButton
          onClick={() =>
            modalType === 'cart'
              ? dispatch(deleteFromShoppingCart(id))
              : dispatch(deleteFromFavorites(id))
          }
          sx={{ justifySelf: 'end' }}
        >
          {modalType === 'cart' ? <DeleteIcon /> : <HeartBrokenIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
}
