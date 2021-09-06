import React, { useState} from "react";
import { ReactComponent as FormTop } from "../../img/formTop.svg";
import AuthBG from "../../img/authBG.svg";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import color from "../theme/Theme";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import { ThemeProvider } from "@material-ui/core";
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
    marginTop:'10px'
  },
  instButton:{
    backgroundColor:"#FFE269",
    marginTop:'15px'
  },
  instSection:{
    backgroundColor: "#FFF6D1",
    width: "100%",
    padding: "20px 30px",
    marginTop: '70px',
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    errEmail: false,
    textEmail: "",
    errPassword: false,
    textPassword: "",
  });
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

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (!navigator.onLine) {
      setState({ ...state, open: true });
      setErr("Your Are Offline, Check from Connec");
    }
    else if (validate.errEmail || validate.errPassword ){
      setState({ ...state, open: true });
      setErr("enter value");
    }
    else {
      setLoading(true);
    const data = {
      email: signin.email,
      password: signin.password,
    };
    axios
      .post("users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        history.push("/Home", { from: "SignIn" })
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
  const validationEmail = (e)=>{
    setSignin({ ...signin, email: e.target.value });
    if (!validateEmail(e.target.value) && (e.target.value !== ""))
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
      }
      else 
      setValidate({
        ...validate,
        errEmail: false,
        textEmail: "",
      });
  }
  const validationPassword = (e)=>{
    setSignin({ ...signin, password: e.target.value });
    if ((e.target.value !== "") && (e.target.value.length<8))
      setValidate({
        ...validate,
        errPassword: true,
        textPassword: "The password must be at least 8 characters",
      });
      else if (e.target.value === ""){
        setValidate({
          ...validate,
          errPassword: true,
          textPassword: "password input required",
        });
      }
    else
      setValidate({
        ...validate,
        errPassword: false,
        textPassword: "",
      });
  }

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
              error={validate.errEmail}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              helperText={validate.textEmail}
              value={signin.email}
              onChange={e=>validationEmail(e)}
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
              value={signin.password}
              onChange={e=> validationPassword(e)}
            />
            <Box className={classes.rightOutline}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
            <div className={classes.boxLoading}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Grid container >
              <Grid item xs></Grid>
              <Grid item onClick={()=> history.push("/Signup", { from: "SignIn" })} >
                <Link className={classes.center} href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Grid item xs className={classes.instSection}>
            <Typography component="h1" variant="body1">
              Teach in OUTLINE platform?
            </Typography>
            <Button type="submit" fullWidth variant="contained" className={classes.instButton} onClick={()=> history.push("/SingUpInstructor", { from: "SignIn" })}>
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
