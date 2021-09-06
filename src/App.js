import React,{useEffect, useState} from "react";
import Home from "./components/home/Home";
import SingUp from "./components/authentication/SingUp";
import SignIn from "./components/authentication/SignIn";
import NetworkDetector from "./components/error/NetworkDetector";
import NotFound from "./components/error/NotFound";
import SingUpInstructor from "./components/authentication/SignUpInstructor";
import Tags from "./components/tags/tags";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";



const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/Home">
            {
              localStorage.getItem("token") ? <Home/> : <Redirect to="/signin"/>
            }
          </Route>
          <Route path="/signup" component={SingUp}></Route>
          <Route path="/singupinstructor" component={SingUpInstructor}></Route>
          <Route path="/signin" exact component={SignIn}></Route>
          <Route path="/tags" exact component={Tags}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default NetworkDetector(App);
