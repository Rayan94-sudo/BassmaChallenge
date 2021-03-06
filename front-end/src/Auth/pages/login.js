import{ React,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../Auth/componets/axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const classes = useStyles();
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
         
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              
                onChange={event=>setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={event=>setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
             
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           onClick={(event)=>{
           axios.post("http://127.0.0.1:8000/api/auth/signin/", {
              email: email,
              password: password
            })
            .then((response) => {
              console.log(response.data.user.role);
              console.log(response.data.access_token);
              localStorage.setItem('access_token', response.data.access_token);
              if (response.data.user.role ==='client')
              window.location.href = "http://localhost:3000/thanks";
            else  {
            localStorage.setItem('is_admin',true);
            window.location.href = "http://localhost:3000/menu";
            }
            });
            event.preventDefault();
        }}
          >
          Login
          </Button>
        
        </form>
      </div>
      <Box mt={5}>
  
      </Box>
    </Container>
  );
}