import React, { useState } from "react";
import AllCourses from "./ExploreCourses";
import MyCourses from "./MyCourses";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CourseBG from "../img/coursesBG.png";
import TypeBG from "../img/type.svg";
import ShapeBG from "../img/logoshap.svg";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  heroBox: {
    background: `-webkit-linear-gradient(rgba(38, 50, 56, 0.8), rgba(38, 50, 56, 0.8)), url(${CourseBG})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "40vh",
    maxWidth: "100vw",
    marginBottom: "20px",
    borderRadius: "12px",
  },
  imgA: {
    height: "20vh",
    width: "auto",
    margin: "10px",
  },
  imgB: {
    height: "40vh",
    width: "auto",
  },

  customChips: {
    background: "rgba(38,50,56,0.8)",
    color: "#fff",
  },
}));

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Courses = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.heroBox}>
            <img className={classes.imgA} src={TypeBG} />
            <img className={classes.imgB} src={ShapeBG} />
          </div>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%" }} >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            indicatorColor="primary"
            style={{marginBottom:"20px"}}
          >
            <Tab label="Expolore Courses" {...a11yProps(0)} />
            <Tab label="My Courses" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {/* <Typography variant="subtitle1" color="secondary">All Courses</Typography> */}
          <AllCourses />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyCourses />
        </TabPanel>
      </Box>
    </>
  );
};
export default Courses;
