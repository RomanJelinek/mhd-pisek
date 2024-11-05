import { ReactNode, useState } from 'react';

interface ModalState {
  isOpen: boolean;
  modalContent: ReactNode;
}

export const useModalControl = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    modalContent: <></>,
  });

  const openModal = (modalContent: ReactNode) => {
    setModalState({ isOpen: true, modalContent });
  };

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  return { modalState, openModal, closeModal };
};
