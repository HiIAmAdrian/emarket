import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { ADMIN, USER } from '../../../common/variables/constants';
import { getOrders } from '../../../common/services/storageHandler';
import { ADMIN_NAME } from '../../../store/reducerAuth';
import { Customer } from '../../../store/reducerCustomers';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function CustomerCard(props: Customer) {
  const { id, email, username, name, address, phone } = props;
  const userRole = username === ADMIN_NAME ? ADMIN : USER;

  getOrders();

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
      <CardHeader
        avatar={
          <Avatar {...stringAvatar(`${name.firstname} ${name.lastname}`)} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name.firstname} ${name.lastname}`}
        subheader={userRole}
      />
      <CardContent>
        <Typography variant="body2">{`ID: ${id}`}</Typography>
        <Typography variant="body2">{`Email: ${email}`}</Typography>
        <Typography variant="body2">{`Username: ${username}`}</Typography>
        <Typography variant="body2">
          {`Address: ${address.street} ${address.number} ${address.city} ${address.zipcode}`}
        </Typography>
        <Typography variant="body2">{`Phone: ${phone}`}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }} disableSpacing>
        <IconButton aria-label="add to favorites">
          <DeleteForeverIcon sx={{ color: 'red' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
