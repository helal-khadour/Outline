import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Logo from "../img/logo.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DescriptionIcon from "@material-ui/icons/Description";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExploreIcon from "@material-ui/icons/Explore";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#fff",
    borderBottomRightRadius: "12px 12px",
    borderTopRightRadius: "12px 12px",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  img: {
    padding: "30px 50px 30px 50px",
  },
  logoutList: {
    position: "absolute",
    bottom: "0",
  },
  Box: {
    width: 239,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  ButtonCreate: {
    margin: "10px 20px 10px 20px",
  },
}));

const DrawerH = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(null);
  const history = useHistory();
  const handleClick = () => {
    setOpen(!open);
  };
  const drawer = (
    <div>
      <List>
        <ListItem
          button
          selected
          onClick={() => {setSelected(0)
            history.push("/Home/NewsFeed", { from: "DrawerH" })}}
          selected={selected === 0}
        >
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="News Feed" />
        </ListItem>
        <ListItem
          button
          onClick={() => {setSelected(1)
            history.push("/Home/Articles", { from: "DrawerH" })}}
          selected={selected === 1}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
        <ListItem
          button
          onClick={() => {setSelected(2)
            history.push("/Home/Questions", { from: "DrawerH" })}}
          selected={selected === 2}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <OndemandVideoIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
            <ListItem
              button
              className={classes.nested}
              onClick={() => {setSelected(3)
                history.push("/Home/Courses/Dashboard", { from: "DrawerH" })}}
              selected={selected === 3}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {setSelected(4)
                 history.push("/Home/Courses/Explore", { from: "DrawerH" })}}
              selected={selected === 4}
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <div className={classes.logoutList}>
        <div className={classes.Box}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.ButtonCreate}
            onClick={() => {
              history.push("/Home/CreateCourse", { from: "DrawerH" })
            }}
          >
            Create new Course
          </Button>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                localStorage.clear();
                history.push("", { from: "DrawerH" })
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <img src={Logo} alt="outline Logo" className={classes.img} />
            {drawer}
          </Drawer>
    </div>
  );
};

export default DrawerH;


