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
import ListItemText from "@material-ui/core/ListItemText";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";


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
    borderRadius: "4x",
  },
  customChips: {
    background: "rgba(38,50,56,0.8)",
    color: "#fff",
  },
  acricalCard: {
    boxShadow: "none",
    borderRadius: "4px",

    "&:hover": {
      background: "#272727",
      color: "#fff",
    },
  },
  infoSection: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 90,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flexStart",
    height: "82vh",
    background: "#fff",
    borderRadius: "4px",
    padding: "20px 10px",
  },
  detailsSections: {
    background: "#fff",
    borderRadius: "4px",
    padding: "20px 10px",
    margin: "10px 0",
  },
  img: {
    width: "100%",
    height: "40vh",
    borderRadius: "4px",
    objectFit: "cover",
  },
  listStyle: {
    background: "#D7E5F9",
    borderRadius: "4px",
    width: "100%",
  },
}));
const PurchasedCourse = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(null);
  const [content, setContent] = React.useState({
      url: "",
      videoName: "ss",
  }
      );
  const [results, setResults] = useState([]);
  const [instructor,setInstructor] = useState('')
  const [contents,setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      const response = await axios
        .get(`courses/60709a39998137003cd0c27c`)
        .catch(function (error) {
          console.log(error);
        });
      setResults(response.data);
      console.log(response.data)
      setContents(response.data.contents)
      setContent({...content, url:response.data.contents[0].content_link, videoName:response.data.contents[0].content_name});
      setInstructor(response.data.owner_user_id);
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

  const renderContent = contents.map((result,index) => {
      
        

    return (
      <React.Fragment key={result._id}>
          
        <List>
          <ListItem
          button
            // className={classes.listStyle}
            justifyContent="space-between"
            onClick={() => {setSelected(index)
                setContent({...content, url:result.content_link, videoName:result.content_name})
            }}
                selected={selected === index}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
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
        alignItems="flex-start"
      >
        <Grid item xs={9}>
          <iframe
            style={{
              borderRadius: "4x",
              border:'none',
              boxShadow: "none",
              width: "100%",
              height: "60vh"
            }}
            src={content.url.replace("view", "preview")}
            name="selectedVideo"
            id="selectedVideo"
            allowfullscreen="true"
            
          ></iframe>
          <Typography variant="h5">{content.videoName.replace(".mp4", "")}</Typography>
        </Grid>
        <Grid item xs={3} className={classes.infoSection}>
        {renderContent}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <>
      {loading ? renderCourse :<Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center"
  style={{height: "80vh"}}
  >
      <Grid item xs={12}  >
          
        
      <CircularProgress />
      </Grid></Grid>}

    </>
  );
};
export default PurchasedCourse;
