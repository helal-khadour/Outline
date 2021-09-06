import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  MainSection:{
      height:"90vh",
    width: '80vw'
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
  tags: {
    dispaly: "flex",
    flexDirection: "row",
    width: "60vw",
    height: "40vh",
  },
  selected: {
    backgroundColor: "#272727",
  },
  tagsBox: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Articles = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = React.useState(0);
  useEffect(() => {
    const getTags = async () => {
      const response = await axios.get("/tags").catch(function (error) {
        console.log(error);
      });
      console.log(response);
      setResults(response.data);
      setLoading(true);
    };
    getTags();
  }, []);

  const updateTags = () => {
    const addTags = async () => {
      var data = {
        tags: tags,
      };
      console.log(tags);
      const response = await axios
        .patch("users/me", data)
        .catch(function (error) {
          console.log(error);
        });
      console.log(response);
    };
    addTags();
  };

  const renderTags = results.map((result, index) => {
    return (
      <React.Fragment key={index}>
        <Grid item xs={12} lg={12} md={12} sm={12} xs={12}>
          <Chip
            label={result.name}
            clickable
            color={selected ? 'secondary' : "primary"}
            onClick={() => {
              setSelected(index);
              setTags((tags) => [...tags, result._id]);
            }}
          />
        </Grid>
      </React.Fragment>
    );
  });
  return (
    <>
    <div className={classes.MainSection}>
      <CssBaseline />
      {/* <Grid container>
        <Grid item xs={12}>
          <div className={classes.heroBox}>
            <Typography variant="h2">Atricles</Typography>
          </div>
        </Grid>
      </Grid> */}
      <Typography>Technology Tags That Interest You</Typography>
      <Typography>
        Picking tags will help us show you much more reverent Post.
      </Typography>
      {/* <TextField
        label="Search tags"
        id="outlined-size-small"
        variant="outlined"
        style={{ width: "100%", backgroundColor: "white" }}
        value={seacrchValue}
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={(e) => setSeacrchValue(e.target.value)}
      /> */}
      <div className={classes.tagsBox}>
        {loading ? (
          <div className={classes.tags}>{renderTags}</div>
        ) : (
          <CircularProgress />
        )}
        <Button variant="contained" color="primary" onClick={updateTags}>
          Primary
        </Button>
      </div>
      </div>
    </>
  );
};
export default Articles;
