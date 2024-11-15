import { Box, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  modalContent: ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen, modalContent, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} fullWidth maxWidth="sm" fullScreen>
      <Box position="relative">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 4,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingY={6}
          paddingX={1}
          gap={2}
        >
          {modalContent}
        </Box>
      </Box>
    </Dialog>
  );
};

export default Modal;
