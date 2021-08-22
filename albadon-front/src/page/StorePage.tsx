import React, { useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { ColumnType } from "../component/datagrid/DataEditors";
import DataGrid from "react-data-grid";
import "./StorePage.scss";
import { Store } from "../data/Interfaces";
import { CommonDataModal } from "../component/datagrid/CommonDataModal";
import {
  createStore,
  deleteStore,
  getStoreListByMemberId,
  updateStore,
} from "../service/StoreService";
import { infoBarState, infoModalState } from "../data/Atoms";
import {
  bossIdState,
  storeListQuerySeqState,
  storeListState,
} from "../data/BossAtoms";
import { useAPICall } from "../hook/useAPICall";

export const StorePage: React.FC = () => {
  const setInfoBar = useSetRecoilState(infoBarState);

  const bossId = useRecoilValue(bossIdState);
  const storeList = useAPICall<Store[]>(useRecoilValueLoadable(storeListState));
  const setStoreListQuerySeq = useSetRecoilState(storeListQuerySeqState);

  const setInfoModal = useSetRecoilState(infoModalState);

  const [modifyTargetStore, setModifyTargetStore] =
    useState<Store | null>(null);

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
    {
      key: "buttons",
      name: "",
      editable: false,
      visible: false,
      formatter: (p: any) => {
        return (
          <div>
            <button
              className="modify-btn"
              onClick={() => {
                setModifyTargetStore(p.row);
              }}
            >
              수정
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `${p.row.storeName} 매장을 삭제하시겠어요?`,
                  onConfirm: () => {
                    deleteStore(+p.row.storeId)
                      .then((res) => {
                        setStoreListQuerySeq((currVal) => currVal + 1);
                      })
                      .catch(() => {
                        setInfoBar({
                          open: true,
                          label: "매장 삭제에 실패했어요 😭",
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
                  },
                  onCancel: () => {},
                });
              }}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div id="StorePage">
      <div className="data-grid">
        <div className="title">
          <h1>{`매장 관리`}</h1>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          매장 추가
        </button>
        {createModalOpen && (
          <CommonDataModal
            onClose={() => {
              setCreateModalOpen(false);
            }}
            onSave={(newRow: any) => {
              createStore({
                bossId: +bossId,
                ...newRow,
              }).then((res) => {
                getStoreListByMemberId(bossId)
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
        {modifyTargetStore && (
          <CommonDataModal
            onClose={() => {
              setModifyTargetStore(null);
            }}
            onSave={(newRow: any) => {
              updateStore(modifyTargetStore.storeId, {
                ...newRow,
                bossId: +bossId,
              })
                .then((res) => {
                  setStoreListQuerySeq((currVal) => currVal + 1);
                })
                .catch(() => {
                  setInfoBar({
                    open: true,
                    label: "매장 수정에 실패했어요 😭",
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
            }}
            colDef={columnDef}
            initialRow={modifyTargetStore}
            title="매장 수정"
          />
        )}
        <DataGrid
          columns={columnDef}
          rows={storeList.state === "hasValue" ? storeList.contents : []}
          defaultColumnOptions={{
            resizable: true,
          }}
          className="common-data-grid"
        />
      </div>
    </div>
  );
};
