import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  getNbOfItems,
  setNbOfItems,
} from '../../common/services/storageHandler';
import { getItems } from '../../store/reducerProducts';

export default function SliderItems() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 300 }}>
      <Typography> Number of Shop Items for Display: </Typography>
      <Slider
        aria-label="NumberOfItems"
        defaultValue={getNbOfItems()}
        valueLabelDisplay="auto"
        step={1}
        onChange={(e) => {
          setNbOfItems((e.target as HTMLTextAreaElement).value);
          dispatch(getItems());
        }}
        marks
        min={10}
        max={20}
      />
    </Box>
  );
}
