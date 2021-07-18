import { Button, Modal } from "@material-ui/core";
import React, { useState } from "react";

export interface Props {
  label: string;
  onClose?: () => void;
}
export const EmployeeModal: React.FC<Props> = ({ label, onClose }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModalClose = () => {
    setOpenModal(false);
    onClose && onClose();
  };
  return (
    <>
      <Button>{label}</Button>
      <Modal open={openModal} onClose={handleModalClose}>
        <div>asedf</div>
      </Modal>
    </>
  );
};
