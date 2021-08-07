import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { storeListState } from "../data/BossAtoms";
import { contractSummaryState } from "../data/ContractAtoms";
import { Store } from "../data/Interfaces";
import { storeDetailState } from "../data/StoreAtoms";
import "./Sidebar.scss";

export enum NavOption {
  STORE = "STORE",
  EMPLOYEE = "EMPLOYEE",
}
export const Sidebar: React.FC = () => {
  const storeList = useRecoilValueLoadable(storeListState);
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

  useEffect(() => {
    if (
      storeList.state === "hasValue" &&
      (!store?.storeId ||
        !storeList.contents.some(
          (item: Store) => item.storeId === store.storeId
        ))
    ) {
      setStore(storeList.contents[0]);
    }
  }, [storeList]);

  const handleStoreSelect = (e: any) => {
    const store = storeList.contents.filter(
      (store: Store) => +store.storeId === +e.target.value
    );

    if (store.length > 0) {
      setStore(store[0]);
      history.push("/employee");
      resetContractDetail();
    }
  };

  return (
    <div id="Sidebar">
      <select
        id="storeSelect"
        title="매장을 선택해주세요"
        onChange={handleStoreSelect}
        value={store?.storeId}
      >
        {storeList.state === "hasValue" &&
          storeList.contents.map((store: Store) => {
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
