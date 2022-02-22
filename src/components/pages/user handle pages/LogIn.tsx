import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/reducerAuth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { DONT_CLICK_URL, ADMIN_NAME } from '../../../constants';
import Header from '../../header/Header';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {'Copyright © '}
      <Link color="inherit" href={DONT_CLICK_URL}>
        DO NOT CLICK HERE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post('https://fakestoreapi.com/auth/login', {
        username: data.get('username'),
        password: data.get('password'),
      })
      .then((res) => {
        localStorage.setItem('userName', JSON.stringify(data.get('username')));
        dispatch(login(res.data));
        if (data.get('username') === ADMIN_NAME) {
          console.log('da');
          navigate('/dashboard');
        } else {
          navigate('/products');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
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
                Log in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" component={RouterLink} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright />
          </Container>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
