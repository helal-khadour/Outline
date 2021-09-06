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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

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

const Articles = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios
        .get("https://outline-app-api.herokuapp.com/articles")
        .catch(function (error) {
          console.log(error);
        });
      console.log(response);
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
    if (hours === 0) {
      return +minutes + ":" + seconds; // Return in MM:SS format
    } else {
      return hours + ":" + minutes + ":" + seconds; // Return in HH:MM:SS format
    }
  }

  const renderArticle = results.map((result) => {
    return (
      <React.Fragment key={result.article.id}>
        <Grid item xs={3} lg={3} md={4} sm={6} xs={12}>
          <Card
            className={classes.acricalCard}
            onClick={() => {
            
              history.push(`/Home/Articles/${result.article.id}`, {
                from: "Home",
              });
            }}
          >
            <CardMedia
              className={classes.media}
              image={result.article.banner}
            />
            <Typography variant="subtitle1">{result.article.title}</Typography>

            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={result.article.owner_user_id.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={result.article.owner_user_id.name}
                  secondary={secondsToHms(result.article.createdAt)}
                />

                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemText
                  primary="12"
                />
              </ListItem>
            </List>
          </Card>
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
      <Grid container spacing={1}>
        {loading ? renderArticle : <CircularProgress />}
      </Grid>
    </>
  );
};
export default Articles;
