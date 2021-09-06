import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import CourseBG from "../../img/coursesBG.png";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
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
    borderRadius: "4px",
  },
  customChips: {
    background: "rgba(38,50,56,0.8)",
    color: "#fff",
  },
  acricalCard: {
    boxShadow: "none",
    borderRadius: "4px",

    "&:hover": {
      boxShadow: '3px 0px 7px 2px rgba(0, 0, 0, .2)',
    },
  },
  avatarSection: {
    display: "flex",
alignItems: "center",
  },
  ExploreSection: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }
}));
const AllCourses = () => {
  const history = useHistory();
  const classes = useStyles();
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get("courses").catch(function (error) {
        console.log(error);
      });
      setResults(response.data);

      setLoading(true);
    };
    getCourses();
  }, []);

  const renderCourses = results.map((result) => {
    return (
      <React.Fragment key={result._id}>
        <Grid item xs={3} lg={3} md={4} sm={6} xs={12}>
          <Card className={classes.acricalCard}>
            <CardMedia className={classes.media} image={result.banner} />

            <CardContent>
              <Typography variant="h6" color={'textPrimary'}>{result.title}</Typography>
              
              
             
               <div className={classes.avatarSection}>
                  <Avatar
                    aria-label="recipe"
                    
                    src={result.owner_user_id.avatar}
                  />
                
                <Typography variant="subtitle2" style={{margin:"0 10px"}}>{result.owner_user_id.name}</Typography>
                </div>
<div className={classes.ExploreSection}>
                <Button variant="contained" color="primary" onClick={ ()=> history.push(`/Home/ExploreCourses/${result._id}`, {
                from: "coursesDashboard",
              })}>
        Explore Now
      </Button>
      <Typography variant="h5"  color={'primary'}>${result.price}</Typography>
      </div>
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
      </Grid>
    </>
  );
};
export default AllCourses;
