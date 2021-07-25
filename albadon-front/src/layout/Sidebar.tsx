import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentStoreId } from "../data/Atoms";
import { storeListState } from "../data/Selectors";
import "./Sidebar.scss";

export enum NavOption {
  CALENDAR = "CALENDAR",
  EMPLOYEE = "EMPLOYEE",
  STORE = "STORE",
}
export const Sidebar: React.FC = () => {
  const storeList = useRecoilValue(storeListState);
  const [storeId, setStoreId] = useRecoilState(currentStoreId);

  const history = useHistory();
  const [navOption, setNavOption] = useState<NavOption>(NavOption.CALENDAR);
  const { t } = useTranslation();
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

  const handleStoreSelect = (e: any) => {
    setStoreId(e.target.value);
  };

  return (
    <div id="Sidebar">
      <select
        id="storeSelect"
        onChange={handleStoreSelect}
        value={storeList.length > 0 ? storeList[0].storeId : undefined}
      >
        {storeList.map((store) => {
          return (
            <option key={store.storeName} value={store.storeId}>
              {store.storeName}
            </option>
          );
        })}
      </select>
      <div id="navigationBar">
        {Object.keys(NavOption).map((option) => {
          return (
            <div
              key={option}
              className={navOption === option ? "navi-btn active" : "navi-btn"}
              onClick={() => {
                setNavOption(option as NavOption);
              }}
            >
              {t(`sideBar.${option}`)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
