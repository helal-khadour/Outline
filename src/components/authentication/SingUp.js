import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as FormTop } from "../../img/formTop.svg";
import AuthBG from "../../img/authBG.svg";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import { ThemeProvider } from "@material-ui/core";
import color from "../theme/Theme";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerOutline: {
    height: "100",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-between",
  },
  rightOutline: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height: "100%",
    width: "100%",
    objectPosition: "center top",
    objectFit: "contain",
  },
  boxLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  buttonProgress: {
    color: "#272727",
    position: "absolute",
    marginTop: "10px",
  },
  instButton: {
    backgroundColor: "#FFE269",
    marginTop: "15px",
  },
  instSection: {
    backgroundColor: "#FFF6D1",
    width: "100%",
    padding: "20px 30px",
    marginTop: "70px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
export default function SingUp() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validate, setValidate] = useState({
    errName: false,
    errName: "",
    errEmail: false,
    textEmail: "",
    errPassword: false,
    textPassword: "",
    errConfirm: false,
    textConfirm: "",
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')){
        localStorage.clear();
    }
    
    if (!navigator.onLine) {
      setState({ ...state, open: true });
      setErr("Your Are Offline, Check from Connect");
    } else if (validate.errEmail || validate.errPassword || validate.errConfirm || validate.errName ) {
      setState({ ...state, open: true });
      setErr("enter value");
    } else {
      setLoading(true);
      const data = {
        name: signup.name,
        email: signup.email,
        password: signup.password,
      };
      axios
        .post("users", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setLoading(false);
          history.push("/Home", { from: "SingUp" });
        })
        .catch((err) => {
          setState({ ...state, open: true });
          setErr(err.response.data.error);
          setLoading(false);
        });
    }
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validationName = (e) =>{
    if (e.target.value === "") {
        setValidate({
          ...validate,
          errName: true,
          textName: "username input required",
        });
      } else
        setValidate({
          ...validate,
          errName: false,
          textName: "",
        });
    setSignup({ ...signup, name: e.target.value });
  }
  const validationEmail = (e) => {
    setSignup({ ...signup, email: e.target.value });
    if (!validateEmail(e.target.value) && e.target.value !== "")
      setValidate({
        ...validate,
        errEmail: true,
        textEmail: "Inter valid email",
      });
    else if (e.target.value === "") {
      setValidate({
        ...validate,
        errEmail: true,
        textEmail: "Email input required",
      });
    } else
      setValidate({
        ...validate,
        errEmail: false,
        textEmail: "",
      });
  };
  const validationPassword = (e) => {
    setSignup({ ...signup, password: e.target.value });
    if (e.target.value !== "" && e.target.value.length < 8)
      setValidate({
        ...validate,
        errPassword: true,
        textPassword: "The password must be at least 8 characters",
      });
    else if (e.target.value === "") {
      setValidate({
        ...validate,
        errPassword: true,
        textPassword: "password input required",
      });
    } else
      setValidate({
        ...validate,
        errPassword: false,
        textPassword: "",
      });
  };
  const validationConfirmPassword = (e) => {
    setSignup({ ...signup, confirmPassword: e.target.value });
    if (e.target.value !== signup.password)
      setValidate({
        ...validate,
        errConfirm: true,
        textConfirm: "not matched",
      });
    else if (e.target.value === "") {
      setValidate({
        ...validate,
        errConfirm: true,
        textConfirm: " confirm password input is required",
      });
    } else
      setValidate({
        ...validate,
        errConfirm: false,
        textConfirm: "",
      });
  };

  return (
    <ThemeProvider theme={color}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          className={classes.centerOutline}
          item
          xs={12}
          sm={12}
          md={5}
          lg={4}
        >
          <FormTop />
          <Box className={classes.paper}>
            <Typography component="h1" variant="h4">
              Welcome Back
            </Typography>
            <Typography component="h1" variant="body1">
              Login your account
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                error={validate.errName}
                fullWidth
                id="name"
                label="Username"
                name="name"
                helperText={validate.textName}
                value={signup.name}
                onChange={(e) => validationName(e)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                error={validate.errEmail}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                helperText={validate.textEmail}
                value={signup.email}
                onChange={(e) => validationEmail(e)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                error={validate.errPassword}
                id="password"
                autoComplete="current-password"
                helperText={validate.textPassword}
                value={signup.password}
                onChange={(e) => validationPassword(e)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                error={validate.errConfirm}
                id="confirmPassword"
                autoComplete="current-password"
                helperText={validate.textConfirm}
                value={signup.confirmPassword}
                onChange={(e) => validationConfirmPassword(e)}
              />
              <div className={classes.boxLoading}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <Grid container>
                <Grid item xs></Grid>
                <Grid
                  item
                  onClick={() => history.push("/Signin", { from: "signin" })}
                >
                  <Link className={classes.center} href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Grid item xs className={classes.instSection}>
              <Typography component="h1" variant="body1">
                Teach in OUTLINE platform?
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.instButton}
                onClick={() =>
                  history.push("/SingUpInstructor ", { from: "signup" })
                }
              >
                Sign up as instructor
              </Button>
            </Grid>
          </Box>
        </Grid>

        <Hidden only={["sm", "xs"]}>
          <Grid
            item
            md={7}
            lg={8}
            style={{ height: "100vh", background: "#fff" }}
            container
          >
            <img src={AuthBG} alt="BG" className={classes.img} />
          </Grid>
        </Hidden>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message={err}
          key={vertical + horizontal}
        />
      </Grid>
    </ThemeProvider>
  );
}
