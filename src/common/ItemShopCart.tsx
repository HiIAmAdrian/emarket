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
} from '../store/reducerAuth';
import { SetQuantity, ShopItem } from '../types';

export default function ItemShopCart(props: ShopItem) {
  const { id, title, price, image, quantity } = props;
  const [totalPrice, setTotalPrice] = useState(price);
  const dispatch = useDispatch();

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
        <Typography sx={{ marginRight: '15px' }} align="center" variant="h6">
          {totalPrice.toFixed(2)}
        </Typography>

        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          onChange={(e) => {
            dispatch(
              setQuantityOfProduct({
                id: id,
                quantity: +e.currentTarget.value,
              } as SetQuantity)
            );
            setTotalPrice(price * +e.currentTarget.value);
          }}
          sx={{ width: 71, justifySelf: 'end' }}
          defaultValue={quantity}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]', min: '1' }}
        />
        <IconButton
          onClick={() => dispatch(deleteFromShoppingCart(id))}
          sx={{ justifySelf: 'end' }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
