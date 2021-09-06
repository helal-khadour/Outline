import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import Articles from "../articles/AllArticles";
import IndividualArticle from "../articles/IndividualArticle";
import IndividualCourse from "../courses/IndividualCourse";
import ExploreCourses from "../courses/ExploreCourses";
import CoursesDashboard from "../courses/CoursesDashboard";
import CreateCourse from "../courses/CreateCourse";
import PurchasedCourse from "../courses/PurchasedCourse";
import NewsFeed from "../newsfeed/NewsFeed";
import Profile from "../profile/Profile";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import color from "../theme/Theme";
import Drawer from "@material-ui/core/Drawer";
import Logo from "../../img/logo.svg";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExploreIcon from "@material-ui/icons/Explore";
import TimelineIcon from "@material-ui/icons/Timeline";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useHistory} from "react-router-dom";
import axios from "axios";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#F3F3F3",
    color: "#263238",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#F3F3F3",
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
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
    borderBottomRightRadius: "4px 4px",
    borderTopRightRadius: "4px 4px",
  },
  img: {
    padding: "20px 50px 10px 50px",
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
const Home = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('');
  const [caption, setCaption] = React.useState("News Feed");
  const {path, url} = useRouteMatch();
  const history = useHistory();
  const [user, setUser] = useState("");
  const getUser = async () => {
    const response = await axios.get(`users/me`).catch(function (error) {
      console.log(error);
    });
    setUser(response.data);
  };
  useEffect(() => {
    if (!navigator.onLine) {
      // setState({ ...state, openSnack: true });
      // setErr("Hmmm....Your Are Offline, Check from Connect");
      console.log('Hmmm....Your Are Offline, Check from Connect')
    } else if (localStorage.getItem("token")) {
      getUser();
    }
  }, [user]);
  const drawer = (
    <div>
      <List>
        <ListItem
          button
          selected
          component={Link}
          to={`${url}/newsfeed`}
          onClick={() => {
            setSelected(0);
            setCaption("News Feed");
          }}
          selected={selected === 0}
        >
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="News Feed" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`${url}/articles`}
          onClick={() => {
            setSelected(1);
            setCaption("Articles");
          }}
          selected={selected === 1}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`${url}/questions`}
          onClick={() => {
            setSelected(2);
            setCaption("Questions");
          }}
          selected={selected === 2}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={`${url}/explorecourses`}
          onClick={() => {
            setCaption("Explore Courses");
            setSelected(4);
          }}
          selected={selected === 4}
        >
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore Courses" />
        </ListItem>
    
      {user.role !== "basic user" && (
        <ListItem
          button
          component={Link}
          to={`${url}/coursesdashboard`}
          onClick={() => {
            setSelected(3);
            setCaption("Courses Dashboard");
          }}
          selected={selected === 3}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Courses Dashboar" />
        </ListItem>
        
      )}
        </List>
      <div className={classes.logoutList}>
        <div className={classes.Box}>
          {user.role !== "basic user" && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.ButtonCreate}
              component={Link}
              to={`${url}/createcourse`}
              onClick={() => {
                setCaption("Create Course");
              }}
            >
              Create new Course
            </Button>
          )}
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                localStorage.clear();
                setUser("")
                history.push("/signin", { from: "Home" });
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
    <>
        <ThemeProvider theme={color}>
          <CssBaseline />
          <AppBar user={user} caption={caption} />
          <div className={classes.toolbar} />
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
          <main className={classes.content}>
            <Switch>
              <Route path={`${path}/newsfeed`} exact component={NewsFeed}></Route>
              <Route path={`${path}/articles`} exact component={Articles}></Route>
              <Route
                path={`${path}/articles/:id`}
                component={IndividualArticle}
              ></Route>
              <Route
                path={`${path}/explorecourses/:id`}
                component={IndividualCourse}
              ></Route>
              <Route
                path={`${path}/explorecourses/mycourse/:id`}
                component={PurchasedCourse}
              ></Route>
              <Route
                path={`${path}/explorecourses`}
                exact
                component={ExploreCourses}
              ></Route>
              <Route
              exact
                path={`${path}/createcourse`}
                component={CreateCourse}
              ></Route>
              <Route
              exact
                path={`${path}/coursesdashboard`}
                component={CoursesDashboard}
              ></Route>
              <Route path={`${path}/profile`} component={Profile}></Route>
            </Switch>
          </main>
        </ThemeProvider>
    </>
  );
};
export default Home;
