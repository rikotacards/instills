import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
import { TopAppbar } from "../components/TopAppbar";
import { CreatePost } from "../components/CreatePost";
import { Outlet } from "react-router";
import { CreatePostProvider } from "../providers/createPostProvider";
import { SideDrawer } from "../components/SideDrawer";
import { useAuthContext } from "../providers/useContexts";
import { BottomAppBar } from "../components/BottomAppBar";
import { ScrollToTop } from "../components/ScrollToTop";

export const Layout: React.FC = () => {
  const isNarrow = useIsNarrow();
  const { user } = useAuthContext();
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
        // flexDirection: isNarrow ? "column" : "row",
        alignItems: "center",
        position: 'relative'
      }}
    >
      <CssBaseline />
      <TopAppbar  onOpen={onOpen} />
      {user && <SideDrawer onOpen={onOpen} isNarrow={isNarrow} />}
      <Box component="main" sx={{ p: 0, width: "100%" , position:'relative'}}>
        <Toolbar />
    <ScrollToTop/>
        <Outlet />
      <BottomAppBar onOpen={onOpen}/>
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
         {user?.uid && <CreatePost 
         onQuit={onQuit}
         uid={user.uid} onClose={onClose} closeWithoutPosts={closeWithoutPosts} />}
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
