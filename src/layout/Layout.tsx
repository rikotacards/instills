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
    <Box display={"flex"} sx={{flexDirection: isNarrow ? 'column' : 'row'}}>
      <CssBaseline />
      <TopAppbar onOpen={onOpen} />
      {!isNarrow && <Toolbar />}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
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
        <Toolbar
          disableGutters
          sx={{ textAlign: "center", alignItems: "center",  justifyContent: 'center' }}
        >
            <Box sx={{flex:1}}/>
          <Typography fontWeight={"bold"} sx={{ pl: 1, display: 'flex' , flex:1,  justifyContent: "center"}}>
            Create
          </Typography>
          <Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end', }}>

          <IconButton >
            <Close onClick={onClose} />
          </IconButton>
          </Box>
        </Toolbar>
        <CreatePostProvider>
          <CreatePostNew />
        </CreatePostProvider>
      </Dialog>
      <Dialog onClose={onCloseConfirm} open={openConfirmation}>
        <DialogContent>Are you sure you want to exit? </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
          <Button fullWidth>Save as Draft and exit</Button>
          <Button onClick={onContinue} fullWidth>
            Continue Editing
          </Button>
          <Button color="error" onClick={onQuit} fullWidth>
            quit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
