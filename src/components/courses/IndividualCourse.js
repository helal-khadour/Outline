import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import CourseBG from "../../img/coursesBG.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Dia from "./Banker";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DevicesIcon from '@material-ui/icons/Devices';
import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  heroBox: {
    background: `url(${CourseBG})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    height: "40vh",
    maxWidth: "100vw",
    marginBottom: "20px",
    borderRadius: "12px",
  },
  customChips: {
    background: "rgba(38,50,56,0.8)",
    color: "#fff",
  },
  acricalCard: {
    boxShadow: "none",
    borderRadius: "10px",

    "&:hover": {
      background: "#272727",
      color: "#fff",
    },
  },
  infoSection: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flexStart",
    height: "87vh",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 10px",
  },
  detailsSections: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 10px",
    margin: "10px 0",
  },
  img: {
    width: "100%",
    height: "40vh",
    borderRadius: "12px",
    objectFit: "cover",
  },
  listStyle: {
    background: "#D7E5F9",
    borderRadius: "12px",
    width: "100%",
  },
}));
const IndividualCourse = (props) => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([])
  const [user,setUser]=useState('')

console.log(props)
  useEffect(() => {
    const getCourse = async () => {
      const response = await axios
        .get(`courses/${props.match.params.id}`)
        .catch(function (error) {
          console.log(error);
        });
      setResults(response.data);
      console.log(response.data)
     setUser(response.data.owner_user_id)
      setContents(response.data.contents)
      setLoading(true);
    };
    getCourse();
  }, []);
  function secondsToHms(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours == 0) {
      return +minutes + ":" + seconds; // Return in MM:SS format
    } else {
      return hours + ":" + minutes + ":" + seconds; // Return in HH:MM:SS format
    }
  }


  
  const renderContent = contents.map((result) => {
    return (
      <React.Fragment key={result._id}>
        <List>
          <ListItem
            className={classes.listStyle}
            justifyContent="space-between"
          >
            <ListItemAvatar>
              <Avatar>
                <PlayCircleFilledIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={result.content_name} />
            <ListItemText
              secondary={`${secondsToHms(
                result.video_duration_in_seconds
              )} Min`}
              alignSelf="flex-end"
            />
          </ListItem>
        </List>

        
        


      </React.Fragment>
    );
  });

  const renderCourse = (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={9}>
          <img className={classes.img} src={results.banner} />
          <Grid item xs={12} className={classes.detailsSections}>
          <Typography variant="h5" color={"primary"}>
              Contents:
            </Typography>
            <Divider />
            {renderContent}
            <Typography variant="h5" color={"primary"}>
              Description:
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              {results.description}Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Typography>
            <Typography variant="h5" color={"primary"}>
              Requirements:
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              {results.requirements}Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </Typography>
            

            
            
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.infoSection}>
          <Typography variant="h6">{results.title}</Typography>
          <Typography variant="subtitle1">The course includes:</Typography>
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem>
              <ListItemIcon>
                <PlayCircleFilledIcon/>
              </ListItemIcon>
              <ListItemText primary={contents.length} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={results.subscribers} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={results.avg_rating} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Full lifetime access" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>
              <ListItemText primary="Access on mobile and Platform" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={results.createdAt} />
            </ListItem>
          </List>
          <Typography variant="subtitle1">Create By:</Typography>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>

          <Typography variant="h4" color={"primary"}style={{alignSelf:"flex-end"}}>${results.price}</Typography>
          
          <Dia />
          
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return <>{loading ? renderCourse : <CircularProgress />}



  


  
  </>;
};
export default IndividualCourse;
