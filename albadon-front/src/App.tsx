import React from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { StorePage } from "./page/StorePage";
import { EmployeePage } from "./page/EmployeePage";
import { CalculatorPage } from "./page/CalculatorPage";
import { InfoModal } from "./component/InfoModal";
import { InfoBar } from "./component/InfoBar";
import { useAPICall } from "./hook/useAPICall";
import { Store } from "./data/Interfaces";
import { useRecoilValueLoadable } from "recoil";
import { storeListState } from "./data/BossAtoms";
import { InitialPage } from "./page/InitialPage";

function App() {
  const storeList = useAPICall<Store[]>(useRecoilValueLoadable(storeListState));
  return (
    <div className="app">
      <InfoBar />
      {storeList.state === "hasValue" &&
        (storeList.contents.length > 0 ? (
          <>
            <Sidebar />
            <div id="container">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/store" />
                </Route>
                <Route exact path="/employee" component={EmployeePage} />
                <Route path="/store" component={StorePage} />
                <Route exact path="/employee/calculator">
                  <Redirect to="/employee" />
                </Route>
                <Route
                  path="/employee/calculator/:contractId"
                  component={CalculatorPage}
                />
              </Switch>
            </div>
          </>
        ) : (
          <InitialPage />
        ))}
      <InfoModal />
    </div>
  );
}

export default App;
