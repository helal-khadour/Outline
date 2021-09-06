import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CourseBG from "../../img/coursesBG.png";
import EmptyBG from "../../img/BgC.svg";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import PaymentIcon from "@material-ui/icons/Payment";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
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
  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    borderRadius: "4px",
    width: "32%",
    backgroundColor: "#C3D6F6",
    color: "#263238",
  },
  mainBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  mainList: {
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  searchBox: {
    diplay: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    width: "100%",
  },
}));
const CoursesDashboard = () => {
  const history = useHistory();
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seacrchValue, setSeacrchValue] = useState("");
  const [statistic, setStatistic] = useState({
    courses: 0,
    totalprice: 0,
    students: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [courseId, setCourseId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const RemoveCourse = () => {
    const deleteCourses = async () => {
      const response = await axios
        .delete(`courses/${courseId}`)
        .catch(function (error) {
          console.log(error);
        });
      console.log(response.data);
      window.location.reload(true);
    };
    deleteCourses();
  };
  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get("courses/me").catch(function (error) {
        console.log(error);
      });
      setResults(response.data);
      
      let contStudents=statistic.students ;
      let totalPrice=statistic.totalprice
      const l = response.data.map((result) => {
        contStudents = contStudents + result.subscribers.length;
        totalPrice = totalPrice + result.subscribers.length * result.price;
      });
        setStatistic({
          ...statistic,
          courses: response.data.length ,
          totalprice: totalPrice,
          students: contStudents,
        });
     
      setLoading(true);
    };
    getCourses();
  }, []);

  const emptyResult = (
    <div emptyBox className={classes.emptyBox}>
      <Typography variant="h6">No Courses Yet</Typography>
      <img src={EmptyBG} />
    </div>
  );
  const renderCourses = results.map((result) => {
    return (
      <React.Fragment key={result._id}>
        {seacrchValue === "" && (
          <Grid item xs={12} lg={12} md={12} sm={12} xs={12}>
            <List className={classes.mainList} >
              <ListItem button onClick={ ()=> history.push(`/Home/ExploreCourses/${result._id}`, {
                from: "coursesDashboard",
              })}>
                <ListItemAvatar>
                  <Avatar
                    src={result.banner}
                    sizes="400px"
                    style={{
                      borderRadius: "4px",
                      width: "120px",
                      height: "75px",
                      marginRight: "20px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={result.title}
                  secondary={`$${result.price}`}
                />

                <ListItemSecondaryAction>
                  {/* <IconButton edge="end" aria-label="delete">
                    <EditIcon color={"primary"} />
                  </IconButton> */}
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      color={"secondary"}
                      onClick={() => {
                        handleClickOpen();
                        setCourseId(result._id);
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        )}
        {result.title.includes(seacrchValue) && seacrchValue !== "" && (
          <Grid item xs={12} lg={12} md={12} sm={12} xs={12}>
            <List className={classes.mainList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={result.banner}
                    sizes="400px"
                    style={{
                      borderRadius: "4px",
                      width: "120px",
                      height: "75px",
                      marginRight: "20px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={result.title}
                  secondary={`$${result.price}`}
                />
                <ListItemSecondaryAction>
                  {/* <IconButton edge="end" aria-label="delete">
                    <EditIcon color={"primary"} />
                  </IconButton> */}
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon color={"secondary"} onClick={handleClickOpen} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        )}
      </React.Fragment>
    );
  });
  return (
    <>
      <Grid container spacing={1} className={classes.body}>
        <div className={classes.mainBox}>
          <div className={classes.Box}>
            <PlayCircleFilledIcon fontSize={"large"} />
            <Typography variant="h6">Courses</Typography>
            <Typography variant="h5">{statistic.courses}</Typography>
          </div>
          <div className={classes.Box}>
            <PeopleIcon fontSize={"large"} />
            <Typography variant="h6">Students</Typography>
            <Typography variant="h5">{statistic.students}</Typography>
          </div>
          <div className={classes.Box}>
            <PaymentIcon fontSize={"large"} />
            <Typography variant="h6">Total Earnings</Typography>
            <Typography variant="h5">{statistic.totalprice}</Typography>
          </div>
        </div>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{margin:"20px 0"}}
        >
          <Grid item xs={6}>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              My Courses
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Search"
              id="outlined-size-small"
              variant="outlined"
              style={{width: "100%" ,backgroundColor: "white"}}
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
            />
          </Grid>
        </Grid>
        {loading ? renderCourses : <Grid container
  direction="row"
  justifyContent="center"
  alignItems="center"><Grid item xs={12}> <CircularProgress /> </Grid></Grid>}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Course"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              RemoveCourse();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CoursesDashboard;
