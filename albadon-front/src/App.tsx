import React from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { InfoModal } from "./component/InfoModal";
import { InfoBar } from "./component/InfoBar";
import { useAPICall } from "./hook/useAPICall";
import { Store } from "./data/Interfaces";
import { useRecoilValueLoadable } from "recoil";
import { storeListState } from "./data/BossAtoms";
import { CalculatorPage, EmployeePage, InitialPage, StorePage } from "./page";

function App() {
  const storeList = useAPICall<Store[]>(useRecoilValueLoadable(storeListState));
  return (
    <div className="app">
      <InfoBar />
      <Switch>
        {storeList.state === "hasValue" &&
          (storeList.contents.length > 0 ? (
            <>
              <div id="container">
                <Route exact path="/">
                  <Redirect to="/store" />
                </Route>
                <Route exact path="/employee" component={EmployeePage} />
                <Route path="/store" component={StorePage} />
                <Route exact path="/calculator" component={CalculatorPage} />
                <Route
                  exact
                  path="/calculator/:contractId"
                  component={CalculatorPage}
                />
              </div>
            </>
          ) : (
            <InitialPage />
          ))}{" "}
      </Switch>
      <InfoModal />
    </div>
  );
}

export default App;
