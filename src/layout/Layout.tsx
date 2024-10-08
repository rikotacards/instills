import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
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
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <Box component="main" sx={{  p: 0, width:'100%' }}>
        {!isNarrow && <Toolbar />}
        {children}
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
        <CreatePost onClose={onClose}/>
       
      </Dialog>
      <Dialog onClose={onCloseConfirm} open={openConfirmation}>
        <DialogContent>Are you sure you want to exit? </DialogContent>
          <Box sx={{p:1}}>
          <Button sx={{mb:1}} variant='outlined' fullWidth>Save as Draft and exit</Button>
          <Button sx={{mb:1}} variant='outlined' fullWidth onClick={onContinue} >
            Continue Editing
          </Button>
          <Button variant='outlined' color="error" onClick={onQuit} fullWidth>
            quit
          </Button>
          </Box>
      </Dialog>
    </Box>
  );
};
