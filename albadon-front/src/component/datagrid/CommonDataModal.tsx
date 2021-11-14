import { Button, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { infoModalState } from "../../data/Atoms";
import {
  ColumnType,
  ComboEditor,
  CommonColumnI,
  DateEditor,
  PhoneEditor,
  NumberEditor,
  TextEditor,
  TimeEditor,
  CheckboxEditor,
} from "./DataEditors";
import "./CommonDataModal.scss";
export interface Props {
  onClose: () => void;
  onSave: (newRow: any) => void;
  colDef: CommonColumnI[];
  initialRow: any;
  title: string;
}
export const CommonDataModal: React.FC<Props> = ({
  onClose,
  onSave,
  colDef,
  initialRow,
  title,
}) => {
  const setInfoModal = useSetRecoilState(infoModalState);
  const [newRowState, setNewRowState] = useState<any>(initialRow || {});
  const handleModalClose = () => {
    setNewRowState(initialRow);
    onClose && onClose();
  };

  const getEditor = (column: CommonColumnI) => {
    const newRow: any = {
      column,
      rowIdx: null,
      row: newRowState,
      onRowChange: (newRow: any) => {
        setNewRowState(newRow);
      },
    };
    switch (column.type) {
      case ColumnType.TEXT:
        return TextEditor(newRow);
      case ColumnType.NUMBER:
        return NumberEditor(newRow);
      case ColumnType.DATE:
        return DateEditor(newRow);
      case ColumnType.PHONE:
        return PhoneEditor(newRow);
      case ColumnType.COMBO:
        return ComboEditor(column.comboArray)(newRow);
      case ColumnType.START_TIME:
        return TimeEditor()(newRow);
      case ColumnType.END_TIME:
        return TimeEditor()(newRow);
      case ColumnType.CHECKBOX:
        return CheckboxEditor(column.checkboxArray)(newRow);
    }
  };

  return (
    <div id="CommonDataModal">
      <Modal id="commonDataModalPopup" open={true} onClose={handleModalClose}>
        <div className="data-modal-container">
          <div className="data-modal-title">{title}</div>
          {colDef.map((col) => {
            if (col.visible === undefined || col.visible) {
              return (
                <div key={`data-row-${col.key}`} className="data-row">
                  <div
                    key={`data-key-${col.key}`}
                    className={
                      col.mandatory ? "mandatory data-key" : "data-key"
                    }
                  >
                    {col.name}
                  </div>
                  <div key={`data-editor-${col.key}`} className="data-editor">
                    {getEditor(col)}
                  </div>
                </div>
              );
            }
          })}
          <div className="btn-area">
            <Button
              className="cancel-btn"
              onClick={() => {
                handleModalClose();
              }}
            >
              취소
            </Button>
            <Button
              className="save-btn"
              disabled={colDef.some((col) => {
                return (
                  col.mandatory &&
                  (newRowState[col.key] === null ||
                    newRowState[col.key] === undefined)
                );
              })}
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: "변경사항을 저장하시겠어요?",
                  onConfirm: () => {
                    onSave && onSave(newRowState);
                    handleModalClose();
                  },
                  onCancel: () => {},
                });
              }}
            >
              저장
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
