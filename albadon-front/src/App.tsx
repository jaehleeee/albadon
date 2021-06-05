import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { getHealthCheck } from "./service/HealthCheckService";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { SamplePage } from "./page/SamplePage";

function App() {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    getHealthCheck().then((res) => {
      console.log(res);
      setValue(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{value}</p>
          <p>{process.env.REACT_APP_API_URL}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/calendar" />
        </Route>
        <Route path="/calendar">
          <SamplePage />
        </Route>
        <Route path="/employee" />
        <Route path="/store" />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      {/* <Redirect to="/" /> */}
    </BrowserRouter>
  );
}

export default App;
