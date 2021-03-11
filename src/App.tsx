import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main";
import Countries from "./pages/Countries";
import { useDispatch } from "react-redux";
import { setCountriesThunk } from "./redux/thunk/thunk";


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCountriesThunk())
  }, [])

  return (
    <>
      <Switch>
        <Route path={"/countries/:ISOCode"}>
          <Countries />
        </Route>
        <Route exact path={"/"}>
          <Main />
        </Route>
      </Switch>
    </>
  );
};

export default App;
