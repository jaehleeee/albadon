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
import { CalculatorPage } from "./page/CalculatorPage";

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
          <Route exact path="/"></Route>
          <Route path="/calendar" component={CalendarPage} />
          <Route path="/employee" component={EmployeePage} />
          <Route path="/store" component={StorePage} />
          <Route path="/calculator/:contractId" component={CalculatorPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
