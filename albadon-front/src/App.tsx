import React from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { StorePage } from "./page/StorePage";
import { EmployeePage } from "./page/EmployeePage";
import { CalculatorPage } from "./page/CalculatorPage";
import { InfoModal } from "./component/InfoModal";
import { InfoBar } from "./component/InfoBar";

function App() {
  return (
    <div className="app">
      <InfoBar />
      <Sidebar />
      <div id="container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/store" />
          </Route>
          <Route exact path="/employee" component={EmployeePage} />
          <Route path="/store" component={StorePage} />
          <Route
            path="/employee/calculator/:contractId"
            component={CalculatorPage}
          />
        </Switch>
      </div>
      <InfoModal />
    </div>
  );
}

export default App;
