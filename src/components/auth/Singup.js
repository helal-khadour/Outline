import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOutline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightOutline:{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SingUp() {
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const classes = useStyles();
  const handleSubmit = (e)=> {
    e.preventDefault()
    const data = {
      name : name,
      email: email,
      password: password
    }
    axios.post('https://outline-app-api.herokuapp.com/users',data).then((response)=>console.log(response)).catch((err)=>(console.log(err)))
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} >
        </Grid>
      <Grid className={classes.centerOutline}item xs={12} sm={8} md={4} component={Paper}  >
        <Box className={classes.paper}   >
        <Typography component="h1" variant="h4">
        Create Account
          </Typography>
          <Typography component="h1" variant="body1">
          Sign Up to continue
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
              variant="outlined"
              error={false}
              margin="dense"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              autoFocus
              helperText=" sss"
              value={name}
              onChange={e=> setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText=" "
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText=" "
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
              <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="confirm password"
              label="confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="currentPassword"
              helperText=" "
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              
            >
              Sign Up
            </Button>
            <Grid className={classes.centerOutline} container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link className={classes.center} href="#" variant="body2" >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}