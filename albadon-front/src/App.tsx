import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { getHealthCheck } from "./service/HealthCheckService";

function App() {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    getHealthCheck().then((res) => {
      console.log(res);
      setValue(res.data);
    });
  }, []);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
