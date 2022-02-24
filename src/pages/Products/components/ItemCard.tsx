import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Rating,
  styled,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGGED } from '../../../common/variables/constants';
import { ShopItem } from '../../../common/variables/types';
import { addToShopCart } from '../../../store/reducerAuth';
import {
  addToFavoritesList,
  deleteFromFavorites,
} from '../../../store/reducerFavorites';
import { getFavorites, getUserAuthState } from '../../../store/store';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ItemCardProps extends ShopItem {
  handleClick: (snack: string) => void;
}

export default function ItemCard(props: ItemCardProps) {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    handleClick,
  } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const isLoggedIn = useSelector(getUserAuthState);
  const favoriteList = useSelector(getFavorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!favoriteList.find((item) => item.id === id)) setFavorite(false);
  }, [favoriteList.find((item) => item.id === id)]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    if (isLoggedIn === LOGGED) {
      const shopItem: Partial<ItemCardProps> = Object.assign({}, { ...props });
      delete shopItem.handleClick;
      dispatch(addToShopCart(shopItem as ShopItem));
      handleClick('cart');
    } else {
      navigate('/login');
    }
  };

  const handleFavorite = () => {
    if (!favorite) {
      const shopItem: Partial<ItemCardProps> = Object.assign({}, { ...props });
      delete shopItem.handleClick;
      dispatch(addToFavoritesList(shopItem as ShopItem));
      handleClick('favorite');
      setFavorite(true);
    } else {
      dispatch(deleteFromFavorites(id));
      setFavorite(false);
    }
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
        <IconButton onClick={handleAddToCart} aria-label="share">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          <FavoriteIcon sx={{ color: favorite ? 'red' : 'gray' }} />
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
