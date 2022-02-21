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
import { ExpandMoreProps, ShopItem } from '../../../types';

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

export default function ItemCard(props: ShopItem) {
  const { title, price, description, category, image, rating } = props;
  const [expanded, setExpanded] = React.useState(false);

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
        <IconButton aria-label="share">
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
