import React from "react";
import { useRecoilValue } from "recoil";
import { infoBarState } from "../data/Atoms";
import "./InfoBar.scss";

export const InfoBar: React.FC = () => {
  const infoBar = useRecoilValue(infoBarState);
  return infoBar.open ? (
    <div id="InfoBar" className={infoBar.type}>
      {infoBar.label}
    </div>
  ) : (
    <></>
  );
};
