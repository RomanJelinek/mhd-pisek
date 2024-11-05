import { Button, Dialog, DialogActions, Box } from '@mui/material';
import { ReactNode } from 'react';

export type ModalProps = {
  isOpen: boolean;
  modalContent: ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen, modalContent, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} fullWidth maxWidth="sm" fullScreen>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingY={4}
        paddingX={2}
        gap={2}
      >
        {modalContent}
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Splnit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
