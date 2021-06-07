import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";

export enum NavOption {
  CALENDAR = "CALENDAR",
  EMPLOYEE = "EMPLOYEE",
  STORE = "STORE",
}
export const Header: React.FC = () => {
  const history = useHistory();
  const [navOption, setNavOption] = useState<NavOption>(NavOption.CALENDAR);

  useEffect(() => {
    switch (navOption) {
      case NavOption.CALENDAR:
        history.push("/calendar");
        break;
      case NavOption.EMPLOYEE:
        history.push("/employee");
        break;
      case NavOption.STORE:
        history.push("/store");
        break;
    }
  }, [navOption]);

  return (
    <div id="Header">
      <div id="navigationBar">
        {Object.keys(NavOption).map((option) => {
          return (
            <label
              className={navOption === option ? "navi-btn active" : "navi-btn"}
              onClick={() => {
                setNavOption(option as NavOption);
              }}
            >
              {option}
            </label>
          );
        })}
      </div>
      <select id="storeSelect">
        <option value="등촌점">등촌점</option>
        <option value="목동점">목동점</option>
      </select>
    </div>
  );
};
