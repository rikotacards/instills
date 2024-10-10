import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
import { Close } from "@mui/icons-material";
import { CreatePostNew } from "../components/CreatePostNew";
import { TopAppbar } from "../components/TopAppbar";
import { CreatePostProvider } from "../providers/createPostProvider";
import { CreatePost } from "../components/CreatePost";
import { Outlet } from "react-router";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC = () => {
  const isNarrow = useIsNarrow();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    onOpenConfirm();
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  const onQuit = () => {
    setIsOpen(false);
    onCloseConfirm();
  };
  const onContinue = () => {
    onCloseConfirm();
  };
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const onOpenConfirm = () => {
    setOpenConfirmation(true);
  };
  const onCloseConfirm = () => {
    setOpenConfirmation(false);
  };
  const closeWithoutPosts = () => {
    setIsOpen(false);
  };

  return (
    <Box
      display={"flex"}
      sx={{
        flexDirection: isNarrow ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <TopAppbar onOpen={onOpen} />
      {!isNarrow && <Toolbar />}
      <Box component="main" sx={{ p: 0, width: "100%" }}>
        {!isNarrow && <Toolbar />}
        <Outlet />
      </Box>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: "800px",
          },
        }}
        onClose={onClose}
        open={isOpen}
        fullScreen={isNarrow}
      >
        <CreatePostProvider>
          <CreatePost onClose={onClose} closeWithoutPosts={closeWithoutPosts} />
        </CreatePostProvider>
      </Dialog>
      <Dialog onClose={onCloseConfirm} open={openConfirmation}>
        <DialogTitle>Discard Post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave, your edits won't be saved
          </DialogContentText>
        </DialogContent>
        <Box sx={{ p: 1 }}>
          <Button
            sx={{ mb: 1 }}
            variant="outlined"
            color="error"
            onClick={onQuit}
            fullWidth
          >
            quit
          </Button>
          <Button
            sx={{ mb: 1 }}
            variant="outlined"
            fullWidth
            onClick={onContinue}
          >
            Continue Editing
          </Button>
          <Button sx={{ mb: 1 }} variant="outlined" fullWidth>
            Save as Draft and exit
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
