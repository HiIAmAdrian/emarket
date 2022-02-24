import Favorite from '@mui/icons-material/Favorite';
import { Badge, Box, Button, Grid, Modal, Typography } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getFavorites, getTotalFavorites } from '../../store/store';
import { ShopItem } from '../variables/types';
import ItemOnList from './ItemOnList';

export default function FavoriteList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getFavoritesList = useSelector(getFavorites);
  const totalNbOfItems = useSelector(getTotalFavorites);

  function createShopCartGridElement(shopCartObj: ShopItem) {
    return (
      <Grid key={shopCartObj.id} xs={12} item>
        <ItemOnList shopItem={shopCartObj} modalType="favorite" />
      </Grid>
    );
  }

  let title = 'Favorites List Empty!';

  if (getFavoritesList.length) {
    title = 'List Of Favorites: ';
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
          <Favorite color="secondary"></Favorite>
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
            {getFavoritesList.map((favoritesObj) =>
              createShopCartGridElement(favoritesObj)
            )}
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
