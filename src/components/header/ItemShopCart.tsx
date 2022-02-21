import * as React from 'react';
import {
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import { ShopItem } from '../../types';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { SetQuantity } from '../../types';
import {
  deleteFromShoppingCart,
  setQuantityOfProduct,
} from '../../redux/reducerAuth';

export default function ItemShopCart(props: ShopItem) {
  const { id, title, price, image } = props;
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
          defaultValue={1}
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
