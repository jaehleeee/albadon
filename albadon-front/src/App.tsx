import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { getHealthCheck } from "./service/HealthCheckService";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { SamplePage } from "./page/SamplePage";
import { RecoilRoot } from "recoil";
import { CalendarPage } from "./page/CalendarPage";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import { EmployeePage } from "./page/EmployeePage";

function App() {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    getHealthCheck().then((res) => {
      console.log(res);
      setValue(res.data);
    });
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
 <div className ="app">
      <Sidebar/>
        <div id="container">
          <Switch>
            {/* <Route exact path="/">
              <Redirect to="/calendar" />
            </Route> */}
            <Route path="/calendar">
              <CalendarPage />
              
            </Route>
            <Route path="/sample"><SamplePage/></Route>
            <Route path="/employee">
              <EmployeePage/>
            </Route>
            <Route path="/store" />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div></div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
