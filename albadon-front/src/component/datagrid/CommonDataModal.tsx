import { Button, Modal } from "@material-ui/core";
import React, { useState } from "react";
import {
  ColumnType,
  ComboEditor,
  CommonColumnI,
  DateEditor,
  PhoneEditor,
  NumberEditor,
  TextEditor,
} from "./CommonDataGrid";
import "./CommonDataModal.scss";
export interface Props {
  label: string;
  onClose?: () => void;
  onSave?: (newRow: any) => void;
  colDef: CommonColumnI[];
  initialRow?: any;
}
export const CommonDataModal: React.FC<Props> = ({
  label,
  onClose,
  onSave,
  colDef,
  initialRow,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newRowState, setNewRowState] = useState<any>(initialRow || {});
  const handleModalClose = () => {
    setNewRowState({});
    setOpenModal(false);
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
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(!openModal);
        }}
      >
        {label}
      </Button>
      {openModal && (
        <Modal id="CommonDataModal" open={openModal} onClose={handleModalClose}>
          <div className="data-modal-container">
            {colDef.map((col) => {
              return (
                <div key={`data-row-${col.key}`} className="data-row">
                  <div key={`data-key-${col.key}`} className="data-key">
                    {col.name}
                  </div>
                  <div key={`data-editor-${col.key}`} className="data-editor">
                    {getEditor(col)}
                  </div>
                </div>
              );
            })}
            <div className="btn-area">
              <Button
                onClick={() => {
                  handleModalClose();
                }}
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  onSave && onSave(newRowState);
                  handleModalClose();
                }}
              >
                저장
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
