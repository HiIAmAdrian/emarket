import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getItems } from '../../store/reducerProducts';

export default function SliderItems() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 300 }}>
      <Typography> Number of Shop Items for Display: </Typography>
      <Slider
        aria-label="NumberOfItems"
        defaultValue={JSON.parse(
          localStorage.getItem('numberOfItems') as string
        )}
        valueLabelDisplay="auto"
        step={1}
        onChange={(e) => {
          localStorage.setItem(
            'numberOfItems',
            JSON.stringify((e.target as HTMLTextAreaElement).value)
          );
          dispatch(getItems());
        }}
        marks
        min={10}
        max={20}
      />
    </Box>
  );
}