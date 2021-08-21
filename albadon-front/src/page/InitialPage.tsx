import React, { useState } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { CommonDataModal } from "../component/datagrid/CommonDataModal";
import { ColumnType } from "../component/datagrid/DataEditors";
import { infoBarState } from "../data/Atoms";
import { bossState, storeListQuerySeqState } from "../data/BossAtoms";
import { Boss } from "../data/Interfaces";
import { useAPICall } from "../hook/useAPICall";
import { createStore, getStoreListByMemberId } from "../service/StoreService";

import "./InitialPage.scss";

export const InitialPage = () => {
  const setInfoBar = useSetRecoilState(infoBarState);
  const boss = useAPICall<Boss>(useRecoilValueLoadable(bossState));
  const setStoreListQuerySeq = useSetRecoilState(storeListQuerySeqState);

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const columnDef = [
    { key: "storeId", name: "가게ID", maxWidth: 0, visible: false },
    {
      key: "storeName",
      name: "상호",
      type: ColumnType.TEXT,
      editable: false,
      mandatory: true,
    },
    {
      key: "storeAddress",
      name: "주소",
      width: 400,
      type: ColumnType.TEXT,
      editable: false,
    },
    {
      key: "storePhoneNumber",
      name: "전화번호",
      type: ColumnType.PHONE,
      editable: false,
    },
  ];
  return (
    <div id="InitialPage">
      <div className="title">{`안녕하세요, ${boss.contents.bossName}님`}</div>
      <button onClick={() => setCreateModalOpen(true)}>첫 매장 추가하기</button>
      {createModalOpen && (
        <CommonDataModal
          onClose={() => {
            setCreateModalOpen(false);
          }}
          onSave={(newRow: any) => {
            createStore({
              bossId: +boss.contents.bossId,
              ...newRow,
            }).then((res) => {
              getStoreListByMemberId(boss.contents.bossId)
                .then((res) => {
                  setStoreListQuerySeq((currVal) => currVal + 1);
                })
                .catch(() => {
                  setInfoBar({
                    open: true,
                    label: "매장 추가에 실패했어요 😭",
                    type: "error",
                  });
                  setInterval(() => {
                    setInfoBar({
                      open: false,
                      label: "",
                      type: "",
                    });
                  }, 8000);
                });
            });
          }}
          colDef={columnDef}
          initialRow={{}}
          title="매장 추가"
        />
      )}
    </div>
  );
};
