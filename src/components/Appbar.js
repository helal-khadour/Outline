import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabSize:{
    maxWidth:'40px'
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Grid container justify="space-between" alignItems='center' xs={12}>
          <Grid item xs={4}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
              <Tab label="Artcels" {...a11yProps(0)} style={{minWidth:"20%"}}/>
              <Tab label="Questions" {...a11yProps(1)} style={{minWidth:"20%"}}/>
              <Tab label="Courses" {...a11yProps(2)} style={{minWidth:"20%"}}/>
            </Tabs>
          </Grid>
          <Grid item xs={4} justify='center'>
            <Typography variant='h6'>Outline</Typography>
          </Grid>
          <Grid item justify='flex-end'>
          <Link
            color="#fff"
            >
              Sign In
            </Link>
            <Button variant="contained" color="#fff" style={{marginLeft:"10px",marginRight:"10px"}}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
