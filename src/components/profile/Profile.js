import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      background:'#F8F9FA'
    },
    image: {
      // backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:'#ffffff',
      // backgroundSize: 'cover',
      backgroundPosition: 'Right',
      Width: 'auto',
      maxHeight: '100%'
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

const Profile = () => {
    const classes = useStyles();
    return(
        <>
        <CssBaseline/>
        <Grid container xs={12} style={{backgroundColor:"#F8F9FA"}}>
            <Grid container  xs={3} style={{backgroundColor:"#FFF"}}>
                <Grid item>
                    <Avatar />
                    <Typography variant="h6">Milad awad</Typography>
                </Grid>
            </Grid>

            <Grid item xs={9}></Grid>

        </Grid>

        </>
    )
}
export default Profile;