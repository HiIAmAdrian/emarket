import * as React from 'react';
import { styled } from '@mui/material/styles';
import { CardActions, CardContent, CardMedia, CardHeader,
   Card, Collapse, IconButtonProps, IconButton, Typography, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ShopItem{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

const ExpandMore = styled((props: ExpandMoreProps) => {
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
  const { id, title, price, description, category, image, rating } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
        width:"100%",
        maxWidth: 345,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
        }}>
        <CardMedia
        sx={{
          objectFit: "contain"
        }}
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardHeader 
        action={
          null
        }
        title={title}
      />
        <Rating sx={{
          alignSelf: 'center'
        }} name="simple-controlled" value={rating.rate} precision={0.25} readOnly/>
     
      <CardContent>
        <Typography align="center" variant="h4" color="red">
          {Math.floor(price)}
          <sup style={{fontSize: 17}}>{(price % 1).toFixed(2).substring(2)}</sup>
          {" Lei"}
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
          <Typography variant="button">
            See Details
          </Typography>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Rating Value: </b>{rating.rate} <br/>
            <b>Number of Ratings: </b>{rating.count}
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
