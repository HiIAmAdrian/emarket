import React, { useState, useEffect} from 'react';
import axios from 'axios';

function ShopList() {
    const [data, setData] = useState([]);
    const DATABASE_URL = 'https://fakestoreapi.com/products/1';
    axios.get(DATABASE_URL).then(
        reponse => {setData(response.data);
    });

    return ( <div>{data.lastItem}</div> );


}

export default ShopList;