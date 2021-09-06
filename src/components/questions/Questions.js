import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
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
    display: "flex",
    alignItems: "center",
    height: "40vh",
    maxWidth: "100vw",
    backgroundColor: "#bbbbbb",
    marginBottom: "20px",
    borderRadius: "4px",
  },
  acricalCard: {
    boxShadow: "none",
    borderRadius: "4px",
  },
}));

const Questions = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios
        .get("/questions")
        .catch(function (error) {
          console.log(error);
        });
      console.log(response.data);
      setResults(response.data);
      setLoading(true);
    };
    getArticles();
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

  const renderArticle = results.map((result, index) => {
    return (
      <React.Fragment key={index}>
        <Grid item xs={7} lg={7} md={7} sm={7} xs={7} style={{marginBottom:"10px"}}>
          {result.type === "article" && (
            <Card
              className={classes.acricalCard}
              onClick={() => {
                history.push(`/Home/Articles/${result.post.article.id}`, {
                  from: "Home",
                });
              }}
            >
                   <List >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      src={result.post.article.owner_user_id.avatar}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={result.post.article.owner_user_id.name}
                    secondary={secondsToHms(result.post.article.createdAt)}
                  />
                </ListItem>
              </List>
              <CardMedia
                className={classes.media}
                image={result.post.article.banner}
              />
              <Typography variant="subtitle1">
                {result.post.article.title}
              </Typography>
              <ReactQuill theme='bubble' value={new Delta (JSON.parse(result.post.article.content)) } readOnly={true}/>

            </Card>
          )}
          {result.type === "question" && (
            <Card >
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={result.post.question.owner_user_id.avatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={result.post.question.owner_user_id.name}
                  secondary={secondsToHms(result.post.question.createdAt)}
                />
              </ListItem>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                
                <ReactQuill theme='bubble' value={new Delta (JSON.parse(result.post.question.body)) } readOnly={true}/>
                
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          )}
        </Grid>
      </React.Fragment>
    );
  });
  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.heroBox}>
            <Typography variant="h2">Atricles</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>{loading ? renderArticle : <CircularProgress />}</Grid>
    </>
  );
};
export default Questions;
