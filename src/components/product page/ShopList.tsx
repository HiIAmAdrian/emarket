import React, { useEffect} from 'react';
import {getShopList} from '../../redux/store';
import { getItems } from '../../redux/reducer';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { Grid } from '@mui/material';

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

function ShopList() {
    const dispatch = useDispatch();
    const list = useSelector(getShopList);

    useEffect(() => {
        dispatch(getItems());
        console.log("da");
    }, [dispatch]);

    const getShopItemCard = (shopCardObj: ShopItem) => 
    <Grid sx={{display: 'flex'}} key={shopCardObj.id} item xs={10} sm={6} md={4} lg={3} xl={2}>
        <ItemCard {...shopCardObj}/>
    </Grid>

    return (
        <Grid container spacing={2}>
            {list.map(shopCardObj => getShopItemCard(shopCardObj))}
        </Grid>    
    );


}

export default ShopList;