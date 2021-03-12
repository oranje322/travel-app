import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main";
import Countries from "./pages/Countries";
import { useDispatch } from "react-redux";
import { setCountriesThunk } from "./redux/thunk/thunk";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCountriesThunk());
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path="/join" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/countries/:ISOCode" component={Countries} />
        <Route exact path="/" component={Main} />
      </Switch>
    </Fragment>
  );
};

export default App;
