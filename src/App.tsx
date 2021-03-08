import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main";
import Countries from "./pages/Countries";

const App = () => {
  return (
    <>
      <Switch>
        <Route path={"/countries"}>
          <Countries/>
        </Route>
        <Route exact path={"/"}>
          <Main/>
        </Route>
      </Switch>
    </>
  );
};

export default App;
