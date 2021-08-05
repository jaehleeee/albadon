import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { StorePage } from "./page/StorePage";
import { EmployeePage } from "./page/EmployeePage";
import { CalculatorPage } from "./page/CalculatorPage";
import { InfoModal } from "./component/InfoModal";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div id="container">
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/employee" component={EmployeePage} />
          <Route path="/store" component={StorePage} />
          <Route path="/calculator/:contractId" component={CalculatorPage} />
        </Switch>
      </div>
      <InfoModal />
    </div>
  );
}

export default App;
