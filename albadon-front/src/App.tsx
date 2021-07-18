import React, { useEffect } from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { SamplePage } from "./page/SamplePage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CalendarPage } from "./page/CalendarPage";
import { Sidebar } from "./layout/Sidebar";
import { StorePage } from "./page/StorePage";
import { EmployeePage } from "./page/EmployeePage";
import { currentStoreId } from "./data/Atoms";
import { storeListState } from "./data/Selectors";

function App() {
  const storeList = useRecoilValue(storeListState);
  const setStoreId = useSetRecoilState(currentStoreId);

  useEffect(() => {
    if (storeList.length > 0) {
      setStoreId(storeList[0].storeId);
    }
    // eslint-disable-next-line
  }, [storeList]);

  return (
    <div className="app">
      <Sidebar />
      <div id="container">
        <Switch>
          {/* <Route exact path="/">
              <Redirect to="/calendar" />
            </Route> */}
          <Route path="/calendar">
            <CalendarPage />
          </Route>
          <Route path="/sample">
            <SamplePage />
          </Route>
          <Route path="/employee">
            <EmployeePage />
          </Route>
          <Route path="/store">
            <StorePage />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
