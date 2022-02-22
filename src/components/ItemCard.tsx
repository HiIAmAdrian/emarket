import * as React from 'react';
import {
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Collapse,
  IconButton,
  Typography,
  Rating,
  styled,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ExpandMoreProps, ItemCardProps, ShopItem } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuthState } from '../store/store';
import { LOGGED_IN } from '../constants';
import { addToShopCart } from '../store/reducerAuth';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemCard(props: ItemCardProps) {
  const { title, price, description, category, image, rating, handleClick } =
    props;
  const [expanded, setExpanded] = React.useState(false);
  const isLoggedIn = useSelector(getUserAuthState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 345,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        sx={{
          objectFit: 'contain',
        }}
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardHeader action={null} title={title} />
      <Rating
        sx={{
          alignSelf: 'center',
        }}
        name="simple-controlled"
        value={rating.rate}
        precision={0.25}
        readOnly
      />
      <CardContent>
        <Typography align="center" variant="h4" color="red">
          {Math.floor(price)}
          <sup style={{ fontSize: 17 }}>
            {(price % 1).toFixed(2).substring(2)}
          </sup>
          {' Lei'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={
            isLoggedIn === LOGGED_IN
              ? () => {
                  const shopItem: Partial<ItemCardProps> = Object.assign(
                    {},
                    { ...props }
                  );
                  delete shopItem.handleClick;
                  dispatch(addToShopCart(shopItem as ShopItem));
                  handleClick();
                }
              : () => navigate('/login')
          }
          aria-label="share"
        >
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography variant="button">See Details</Typography>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Rating Value: </b>
            {rating.rate} <br />
            <b>Number of Ratings: </b>
            {rating.count}
          </Typography>
          <Typography paragraph>
            <b>Category:</b> {category}
          </Typography>
          <Typography paragraph>
            <b>Description:</b> {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}