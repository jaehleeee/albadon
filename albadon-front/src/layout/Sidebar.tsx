import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { storeListState } from "../data/BossAtoms";
import { contractSummaryState } from "../data/ContractAtoms";
import { storeDetailState } from "../data/StoreAtoms";
import "./Sidebar.scss";

export enum NavOption {
  STORE = "STORE",
  EMPLOYEE = "EMPLOYEE",
}
export const Sidebar: React.FC = () => {
  const storeList = useRecoilValue(storeListState);
  const [store, setStore] = useRecoilState(storeDetailState);
  const resetContractDetail = useResetRecoilState(contractSummaryState);

  const history = useHistory();
  const [navOption, setNavOption] = useState<NavOption>();
  const { t } = useTranslation();

  useEffect(() => {
    switch (navOption) {
      case NavOption.EMPLOYEE:
        history.push("/employee");
        break;
      case NavOption.STORE:
        history.push("/store");
        break;
    }
  }, [navOption]);

  useEffect(() => {
    const path = history.location.pathname;
    if (path.startsWith("/store")) {
      setNavOption(NavOption.STORE);
    } else if (path.startsWith("/employee")) {
      setNavOption(NavOption.EMPLOYEE);
    }
  }, [history.location.pathname]);

  const handleStoreSelect = (e: any) => {
    const store = storeList.filter(
      (store) => +store.storeId === +e.target.value
    );

    if (store.length > 0) {
      setStore(store[0]);
    }

    resetContractDetail();
  };

  return (
    <div id="Sidebar">
      <select
        id="storeSelect"
        title="매장을 선택해주세요"
        onChange={handleStoreSelect}
        value={store.storeId}
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
