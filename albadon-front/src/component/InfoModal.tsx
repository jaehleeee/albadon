import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { useRecoilState } from "recoil";
import { infoModalState } from "../data/Atoms";
import "./InfoModal.scss";

export const InfoModal: React.FC = () => {
  const [infoModal, setInfoModal] = useRecoilState(infoModalState);
  return (
    <Modal className="info-modal" open={infoModal.open} onClose={() => {}}>
      <div className="info-modal-contents">
        <div className="info-modal-label"> {infoModal.label}</div>
        <div className="btn-area">
          <Button
            className="cancel-btn"
            onClick={() => {
              infoModal.onCancel();
              setInfoModal({
                ...infoModal,
                open: false,
              });
            }}
          >
            취소
          </Button>
          <Button
            className="save-btn"
            onClick={() => {
              infoModal.onConfirm();
              setInfoModal({
                ...infoModal,
                open: false,
              });
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
