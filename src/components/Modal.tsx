import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

export type ModalContent = {
  title: string;
  content?: string;
};

export type ModalProps = {
  isOpen: boolean;
  modalContent: ModalContent;
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
      >
        <DialogTitle>{modalContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalContent.content}</DialogContentText>
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
