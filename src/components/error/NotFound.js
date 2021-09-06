import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import color from "../theme/Theme";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotFoundBG from "../../img/notfoundBG.svg";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "2",
 
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.main,
    height: "90vh",
    width: "90vw",
    justifyContent: "center",
    alignItems: "center",
  },
  typeBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(-90px)"
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={color}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.paper}>
            <img src={NotFoundBG} alt="404 not found"></img>
            <div className={classes.typeBox}>
              <Typography variant="h3" style={{ fontWeight: "bold" }}>
                Oops, you've lost in outline
              </Typography>
              <Typography variant="h6">
                We can't find the page you're looking for..
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={"/Home"}
              >
                Go Home
              </Button>
            </div>
          </div>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default NotFound;
