import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://findtheinvisiblecow.com/">
        Do not click here
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });

    fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'John@dsadsadgmail.com',
        username: 'johsdadsand',
        password: 'm38rdsadmF$',
        name: {
          firstname: 'John',
          lastname: 'Doe',
        },
        address: {
          city: 'kilcdsadoole',
          street: '783dsads5 new road',
          number: 3,
          zipcode: '129adsad26-3874',
          geolocation: {
            lat: '-sads.3159',
            long: '81ad.1496',
          },
        },
        phone: '1-570-dsa236-7033',
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    //  axios.post('https://fakestoreapi.com/users', {
    //     username: "dada",
    //     phone: "1-222-222-2222",
    //     adress:{
    //         city:"dada",
    //         street:"dada",
    //         number: 23,
    //         zipcode: "23423-2222",
    //         geolocation: {
    //             lat: "-34.2312",
    //             long: "32.4343"
    //         }
    //     },
    //     name:{
    //     firstname: data.get('firstName'),
    //     lastname: data.get('lastName')
    //     },
    //     email: data.get('email'),
    //     password: data.get('password')
    // }).then(response => console.log(response)).catch(error => console.log(error));
  };

  const handleGet = () => {
    axios
      .get('https://fakestoreapi.com/users')
      .then((response) => console.log(response.data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button onClick={handleGet} fullWidth sx={{ mt: 3, mb: 2 }}>
              Get Users
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" component={RouterLink} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
