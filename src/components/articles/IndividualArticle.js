import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
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
    borderRadius: "12px",
  },
  acricalCard: {
    boxShadow: "none",
    borderRadius: "10px",
  },
}));
const IndividualArticle = (match) => {
  const classes = useStyles();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  var config = {
    method: "get",
    url: "https://outline-app-api.herokuapp.com/articles/60e5cc5abdd72a3fbc97dfc4",
  };

  axios(config)
    .then(function (response) {
      // console.log(response.data);
      setResults(response.data.article);
      setLoading(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  // useEffect(() => {
  //   const getArticle = async () => {
  //     const response = await axios
  //       .get(
  //         `https://outline-app-api.herokuapp.com/articles/60e5cc5abdd72a3fbc97dfc4`
  //       )
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //     console.log(response.data.article);
  //     console.log(response.data.article.content);
  //     setResults(response.data.article);
  //     setLoading(true);
  //   };
  //   getArticle();
  // }, []);

  const renderArticle = (
    <div>
      {/* <Grid item xs={12} lg={12} md={12} sm={12} xs={12}>
          <Card className={classes.acricalCard}>
            <CardMedia
              className={classes.media}
              image={results.banner}
            />
            <CardContent>
              
                <Typography variant="subtitle1">
                  {results.title}
                </Typography>
              
            </CardContent>
            <CardHeader
              avatar={<Avatar src={results.owner_user_id.avatar} />}
              title={results.owner_user_id.name}
            />
          </Card>
        </Grid> */}
    </div>
  );

  return (
    <>
      <Grid container spacing={1}>
        {loading ? (
          <div>
            {results.banner}
            <Avatar src={results.owner_user_id.avatar} />
            {results.title}
            {
              <ReactQuill
                theme="bubble"
                value={new Delta(JSON.parse(JSON.stringify(results.content)))}
                readOnly={true}
              />
            }
          </div>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};
export default IndividualArticle;
