import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CourseBG from "../img/coursesBG.png";
import EmptyBG from "../img/BgC.svg";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
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
  emptyBox:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  }
}));
const MyCourses = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios
        .get("courses/purchased")
        .catch(function (error) {
          console.log(error);
        });
      setResults(response.data);
      setLoading(true);
    };
    getCourses();
  }, []);
  
  const emptyResult=(
    <div emptyBox className={classes.emptyBox}>
      <Typography variant="h6">No Courses Yet</Typography>
      <img src={EmptyBG}/>
    </div>
  )

  const renderCourses = results.map((result) => { 
      return (
        <React.Fragment key={result._id}>
          <Grid item xs={3} lg={3} md={4} sm={6} xs={12}>
            <Card className={classes.acricalCard}>
              <CardMedia className={classes.media} image={result.banner} />
              <Chip
                size="small"
                label="Basic"
                className={classes.customChips}
              />
              <CardContent>
                <Typography variant="subtitle1">{result.title}</Typography>
                <Typography variant="subtitle2">${result.price}</Typography>
                <Typography variant="subtitle2">
                  By {result.owner_user_id.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </React.Fragment>
      );
  });
  return (
    <>
      <Grid container spacing={1} className={classes.body}>
        {loading ? renderCourses : <CircularProgress />}
        {results.length ? renderCourses : emptyResult}
      </Grid>
    </>
  );
};
export default MyCourses;
