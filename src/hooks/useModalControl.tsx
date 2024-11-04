import { ModalContent } from '@/components/Modal';
import { useState } from 'react';

interface ModalState extends ModalContent {
  isOpen: boolean;
}

export const useModalControl = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    content: '',
  });

  const openModal = (title: string, content: string | undefined) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  return { modalState, openModal, closeModal };
};
