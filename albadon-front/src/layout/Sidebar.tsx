import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteChildrenProps, useHistory } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { bossState, storeListState } from "../data/BossAtoms";
import { contractSummaryState } from "../data/ContractAtoms";
import { Boss, Store } from "../data/Interfaces";
import { storeDetailState } from "../data/StoreAtoms";
import { useAPICall } from "../hook/useAPICall";

import storeIcon from "../icons/shop.svg";

import "./Sidebar.scss";

export enum NavOption {
  STORE = "STORE",
  EMPLOYEE = "EMPLOYEE",
  CALCULATOR = "CALCULATOR",
}
export const Sidebar: React.FC<RouteChildrenProps> = ({
  location,
}: RouteChildrenProps) => {
  const boss = useAPICall<Boss>(useRecoilValueLoadable(bossState));
  const storeList = useAPICall<Store[]>(useRecoilValueLoadable(storeListState));
  const [store, setStore] = useRecoilState(storeDetailState);
  const resetContractDetail = useResetRecoilState(contractSummaryState);

  const history = useHistory();
  const [navOption, setNavOption] = useState<NavOption>();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname.startsWith("/store")) {
      setNavOption(NavOption.STORE);
    } else if (location.pathname.startsWith("/employee")) {
      setNavOption(NavOption.EMPLOYEE);
    } else if (location.pathname.startsWith("/calculator")) {
      setNavOption(NavOption.CALCULATOR);
    }
  }, [location.pathname]);

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

  const handleMenuSelect = (option: NavOption) => {
    setNavOption(option);

    switch (option) {
      case NavOption.EMPLOYEE:
        history.push("/employee");
        break;
      case NavOption.STORE:
        history.push("/store");
        break;
      case NavOption.CALCULATOR:
        history.push("/calculator");
        break;
    }
  };

  return (
    <div id="Sidebar">
      <div id="bossInfo">
        {boss.state === "hasValue" && (
          <>
            <span className="bold">{boss.contents.bossName}</span>
            <span>{"님 안녕하세요!"}</span>
          </>
        )}
      </div>

      <div id="storeSelect">
        {storeList.state === "hasValue" && storeList.contents.length > 0 && (
          <>
            <img id="storeIcon" alt="store" src={storeIcon} />
            <select
              title="매장을 선택해주세요"
              onChange={handleStoreSelect}
              value={store?.storeId}
            >
              {storeList.contents.map((store: Store) => {
                return (
                  <option key={store.storeName} value={store.storeId}>
                    {store.storeName}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </div>

      <div id="navigationBar">
        {Object.keys(NavOption).map((option) => {
          return (
            <div
              key={option}
              className={navOption === option ? "navi-btn active" : "navi-btn"}
              onClick={() => {
                handleMenuSelect(option as NavOption);
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
