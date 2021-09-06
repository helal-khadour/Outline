import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    display: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45vw",
  },
  formCollection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    maxWidth: "40vw",
    minWidth: "20vw",
    marginTop: "20px",
  },
  ContentSection: {
    width: "100%",
    minHeight: "50vh",
  },
  contentsBox: {
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between;",
    alignItems: "center;",
    padding: "5px",
    margin: "5px 0",
    background: "#C2D0E4",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
    width: "100%",
  },
  boxLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  buttonProgress: {
    color: "#272727",
    position: "absolute",
    marginTop:'10px',
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%"
  },
}));

const AddVideos = (props) => {
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    if(contents) {
      setLoading(true);
      
    const formdata = new FormData();
    let videos = Array.from(contents);
    for (let i=0; i < videos.length; i++) {
      console.log(videos[i])
      formdata.append("content", videos[i]);
    }
    // formdata.append("content", contents);
    console.log(props)
    await axios
      .patch(
        `/courses/${props.courseId}/contents`,
        formdata
      )
      .then(response => response)
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
      // .then((response) => console.log(response))
      // .catch((err) => {console.log(err)
      //   setState({ ...state, open: true })
      //   // setErr(err)
        setLoading(false)
        setTimeout(history.push("/Home/CoursesDashboard", { from: "AddVideos" }), 2000);
        
      // }
      // )
    }
  };
  const [err, setErr] = useState("");

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    Transition: Slide,
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let renderContents;
  if (contents) {
    let videos = Array.from(contents);
    console.log(videos);
    renderContents = videos.map((video, index) => {
      return (
        <React.Fragment>
          <div className={classes.contentsBox}>
            <PlayCircleFilledIcon />
            <Typography variant="caption" noWrap={false}>
              {video.name}
            </Typography>
            <HighlightOffIcon
              onClick={() => {
                videos.splice(index, 1);
                // var toObject = Object.assign({}, videos);
                setContents(videos);
                // videos=Array.from(contents)
                console.log(contents);
              }}
            
            />
            
          </div>
          {(index===videos.length-1) && <div>
            <input
                accept="video/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  let Data = [...contents, e.target.value]
                  setContents(Data);
                //   var files = e.dataTransfer.files
                //   for (var i = 0, l = files.length; i < l; i++) {
                //     setContents({ ...contents,contents:contents.push(files[i])});
                // }
                  console.log(contents);
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                  Add more Videros
                </Button>
              </label>
              </div>}
        </React.Fragment>
      );
    });
  } else
    renderContents = (
      <div className={classes.formCollection}>
        <Typography variant="subtitle1">
          Click the add videos button, the videos you selected will appear here
        </Typography>
      </div>
    );

  return (
    <>
      <div className={classes.form}>
        <form noValidate autoComplete="off" onSubmit={handleSubmitCreate}>
          <div className={classes.formCollection}>
            <Typography variant="h6">Add videos</Typography>
            <Typography variant="subtitle1">
              Upload the videos you want to include in the course here. You can
              choose more than one video together
            </Typography>
            <div className={classes.summary}>
              <Typography variant="h6">Summary</Typography>
              <input
                accept="video/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  setContents(e.target.files);
                  console.log(contents);
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload vedio
                </Button>
              </label>
            </div>

            <div className={classes.ContentSection}>
              <Divider />
              {renderContents}
            </div>
            <div className={classes.boxLoading}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                disabled={loading}
                className={classes.submit}
              >
                Create Course
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </form>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={err}
        key={vertical + horizontal}
      />
      </div>
    </>
  );
};
export default AddVideos;
