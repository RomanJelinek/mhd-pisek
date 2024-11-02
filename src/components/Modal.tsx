import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  content?: ReactNode;
}

const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  content = '',
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" fullScreen>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {typeof content === 'string' ? (
            <DialogContentText>{content}</DialogContentText>
          ) : (
            content
          )}
        </DialogContent>
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
