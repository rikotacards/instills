import { ChevronLeft, Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
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

import { useCreatePostContext } from "../providers/useContexts";
import { CreatePostForm } from "./CreatePostForm";
import { UploadArea } from "./UploadArea";
import { PostPreview } from "./PostPreview";
import { useIsNarrow } from "../utils/useIsNarrow";
interface CreatePostProps {
  onClose: () => void;
  closeWithoutPosts: () => void;
}
export const CreatePost: React.FC<CreatePostProps> = ({
  onClose,
  closeWithoutPosts,
}) => {
  const [step, setStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onCloseDiscard = () => {
    setOpen(false);
  };
  const cp = useCreatePostContext();
  const hasPosts = cp.posts.length > 0;
  const onPreview = () => {
    inc();
  };
  const inc = () => {
    setStep((p) => p + 1);
  };
  const dec = () => {
    if (step === 0) {
      return;
    }
    setStep((p) => p - 1);
  };
  const onBack = () => {
    if (step === 1) {
      onOpen();
      return;
    }
    dec();
  };
  const onDiscard = () => {
    cp.onReset();
    onCloseDiscard();
    dec();
  };
  const close = () => {
    if (cp.posts.length > 0) {
      onClose();
    } else {
      closeWithoutPosts();
    }
  };
  const isNarrow = useIsNarrow();
  return (
    <Box>
      {!isNarrow && (
        <AppBar elevation={0} sx={{ background: "transparent" }}>
          <Toolbar>
            <IconButton
              onClick={close}
              sx={{ ml: "auto", backdropFilter: "blur(10px)", color: "white" }}
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <AppBar position={isNarrow ? 'fixed': 'relative'} elevation={0}>
      <Toolbar
        
        sx={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          <IconButton onClick={step >= 1 ? onBack : close}>
            {step >= 1 ? <ChevronLeft /> : <Close />}
          </IconButton>
        </Box>
        <Typography
          fontWeight={"bold"}
          sx={{ pl: 0, display: "flex", flex: 1, justifyContent: "center" }}
        >
          {["New post", "Create", "Preview"][step]}
        </Typography>
        <Box
          sx={{ display: "flex", flex: 1, justifyContent: "flex-end", mr: 1 }}
        >
          {hasPosts && <Button disableElevation variant='contained' sx={{textTransform: 'capitalize'}} onClick={onPreview}>{step === 2 ? 'Share': 'Preview'}</Button>}
        </Box>
      </Toolbar>
      </AppBar>
      {isNarrow && <Toolbar/>}

      {step === 0 && (
        <Box sx={{ p: 3 }}>
          <UploadArea onUpload={cp.addSlide} inc={inc} />
        </Box>
      )}
      {step === 1 && <CreatePostForm />}
      {step === 2 && <PostPreview />}
      <Dialog open={open} onClose={onCloseDiscard}>
        <DialogTitle> Discard post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave, your edits won't be saved.
          </DialogContentText>
          <Box sx={{display: 'flex', flexDirection: 'column', pt:1}}>
            <Button variant='outlined' fullWidth color='error' onClick={onDiscard}>Discard</Button>
            <Button onClick={onCloseDiscard}>Cancel</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
