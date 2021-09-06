import React, { useState } from "react";
import AddVideos from "./AddVideos";
import CourseBG from "../../img/createCourseBG.png";
import ShareBG from "../../img/share.svg";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ReplayIcon from "@material-ui/icons/Replay";
import { ThemeProvider } from "@material-ui/core";
import color from "../theme/Theme";
import CircularProgress from "@material-ui/core/CircularProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    borderRadius: "4px",
    display: "flex",
    // overflowY:"scroll",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: "10px",
  },
  Tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-top",
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
  heroBox: {
    background: `url(${CourseBG})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    height: "25vh",
    marginBottom: "25px",
    borderRadius: "4px",
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
  child: {
    marginBottom: "10px",
  },
  upload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40vw",
    height: "100px",
    borderRadius: "4px",
    background: `url(${CourseBG}) `,
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundClip: "padding-box !important",
    text: "#fff",
  },
  ContentSection: {
    width: "50%",
    // height: "50vh",
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
    marginTop: "10px",
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));
export default function CreateCourse() {
  const [course, setCourse] = useState({
    title: "",
    requirements: "",
    price: "",
    description: "",
    banner: null,
  });
  const [courseId, setCourseId] = useState("");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [validate, setValidate] = useState({
    errTitle: false,
    textTitle: "",
    errRequirements: false,
    textRequirements: "",
    errDescription: false,
    textDescription: "",
    errPrice: false,
    textPrice: "",
  });
  const [err, setErr] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    Transition: Slide,
  });
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!navigator.onLine) {
      setState({ ...state, open: true });
      setErr("Your Are Offline, Check from Connec");
    } else if (
      !course.title ||
      !course.description ||
      !course.price ||
      !course.requirements
    ) {
      setState({ ...state, open: true });
      setLoading(false);
      setErr("Enter the information in the required fields");
      if (!course.title)
        setValidate({
          ...validate,
          errTitle: true,
          textTitle: "this filed is required",
        });
      else if (!course.description)
        setValidate({
          ...validate,
          errDescription: true,
          textDescription: "this filed is required",
        });
      else if (!course.price)
        setValidate({
          ...validate,
          errPrice: true,
          textPrice: "this filed is required",
        });
      else if (!course.requirements)
        setValidate({
          ...validate,
          errRequirements: true,
          textRequirements: "this filed is required",
        });
    } else {
      const formdata = new FormData();
      formdata.append("title", course.title);
      formdata.append("requirements", course.requirements);
      formdata.append("price", course.price);
      formdata.append("description", course.description);
      formdata.append("banner", course.banner);
      await axios
        .post("/courses", formdata)
        .then((response) => {
          setCourseId(response.data._id)
        })
        .catch((err) => console.log(err));
      setValue(1);
      setDisabled(false);
      setLoading(false);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={color}>
        <CssBaseline />

        <div>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.heroBox}>
                <img src={ShareBG} style={{ marginLeft: "25px" }} />
              </div>
            </Grid>
          </Grid>
          <div className={classes.mainContainer}>
            <Tabs
              orientation="vertical"
              indicatorColor="primary"
              textColor="primary"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Plan Your Course" {...a11yProps(0)} />
              <Tab label="Add Contents" {...a11yProps(1)} disabled={disabled} />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.Tab}>
              <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                  <div className={classes.formCollection}>
                    <Typography variant="h6">Plan Your Course</Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      className={classes.child}
                    >
                      The platform enables you to create courses by adding a
                      name, requirements and description for the course and
                      attaching an image that reflects the content of the
                      course.
                    </Typography>
                    <Typography variant="subtitle1">
                      How about a working title?
                    </Typography>
                    <TextField
                      error={validate.errTitle}
                      helperText={validate.textTitle}
                      fullWidth="true"
                      id="outlined-basic"
                      variant="outlined"
                      label="Title"
                      multiline
                      rowsMax="2"
                      size="small"
                      floatingLabelText="MultiLine and FloatingLabel"
                      value={course.title}
                      className={classes.child}
                      onChange={(e) => {
                        setCourse({ ...course, title: e.target.value });
                        if (e.target.value == "")
                          setValidate({
                            ...validate,
                            errTitle: true,
                            textTitle: "this filed is required",
                          });
                        else
                          setValidate({
                            ...validate,
                            errTitle: false,
                            textTitle: "",
                          });
                      }}
                    />
                    <Typography variant="subtitle1">
                      Are there any course requirements?
                    </Typography>

                    <TextField
                      error={validate.errRequirements}
                      helperText={validate.textRequirements}
                      fullWidth="true"
                      id="outlined-basic"
                      label="requirements"
                      variant="outlined"
                      multiline
                      rows="2"
                      rowsMax="5"
                      size="small"
                      className={classes.child}
                      value={course.requirements}
                      onChange={(e) => {
                        setCourse({ ...course, requirements: e.target.value });
                        if (e.target.value === "")
                          setValidate({
                            ...validate,
                            errRequirements: true,
                            textRequirements: "this filed is required",
                          });
                        else
                          setValidate({
                            ...validate,
                            errRequirements: false,
                            textRequirements: "",
                          });
                      }}
                    />

                    <Typography variant="subtitle1">
                      What is the description of the course?
                    </Typography>

                    <TextField
                      error={validate.errDescription}
                      helperText={validate.textDescription}
                      fullWidth="true"
                      id="outlined-basic"
                      label="description"
                      variant="outlined"
                      multiline
                      rows="2"
                      rowsMax="5"
                      size="small"
                      className={classes.child}
                      value={course.description}
                      onChange={(e) => {
                        setCourse({ ...course, description: e.target.value });
                        if (e.target.value === "")
                          setValidate({
                            ...validate,
                            errDescription: true,
                            textDescription: "this filed is required",
                          });
                        else
                          setValidate({
                            ...validate,
                            errDescription: false,
                            textDescription: "",
                          });
                      }}
                    />
                    <Typography variant="subtitle1">
                      Put the right price for the course
                    </Typography>
                    <TextField
                      error={validate.errPrice}
                      helperText={validate.textPrice}
                      fullWidth="true"
                      id="outlined-basic"
                      label="price"
                      variant="outlined"
                      multiline
                      rows="2"
                      rowsMax="5"
                      size="small"
                      inputProps={{ inputmode: "numeric" }}
                      className={classes.child}
                      value={course.price}
                      onChange={(e) => {
                        setCourse({ ...course, price: e.target.value });
                        if (e.target.value === "")
                          setValidate({
                            ...validate,
                            errPrice: true,
                            textPrice: "this filed is required",
                          });
                        else
                          setValidate({
                            ...validate,
                            errPrice: false,
                            textPrice: "",
                          });
                      }}
                    />
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      name="banner"
                      multiline
                      rows="2"
                      rowsMax="5"
                      size="small"
                      onChange={(e) => {
                        setCourse({ ...course, banner: e.target.files[0] });
                      }}
                    />
                    <label
                      htmlFor="contained-button-file"
                      className={classes.child}
                    >
                      <div
                        className={classes.upload}
                        style={{
                          background: course.banner
                            ? `url(${URL.createObjectURL(course.banner)})`
                            : "#D7E5F9",
                          border: "0.5px solid #3a7ce1",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="default"
                          component="span"
                          startIcon={
                            course.banner ? <ReplayIcon /> : <CloudUploadIcon />
                          }
                        >
                          {course.banner ? "replace" : "upload"}
                        </Button>
                      </div>
                    </label>
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
              </div>
            </TabPanel>

            <TabPanel value={value} index={1} className={classes.Tab}>
              <AddVideos courseId={courseId} />
            </TabPanel>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              TransitionComponent={state.Transition}
              message={err}
              key={vertical + horizontal}
            />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
