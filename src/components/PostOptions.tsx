import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { deletePost } from "../firebase/posts";
interface PostOptionsProps {
  onClose: () => void;
  postId: string;
}
export const PostOptions: React.FC<PostOptionsProps> = ({postId, onClose }) => {
  const [open, setOpen] = React.useState(false);
  const onCloseConfirm = () => {
    setOpen(false);
  };
  const onOpenConfirm = () => {
    setOpen(true);
  };
  const onPrepareDelete = () => {
    onOpenConfirm();
  };
  const onDelete = async() => {
    onClose();
    onCloseConfirm();
    await deletePost(postId)
    console.log("delete");
  };
  return (
    <Box>
      <DialogContent
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Button onClick={onPrepareDelete} color="error" fullWidth>
          Delete
        </Button>
        <Button fullWidth>Edit</Button>
      </DialogContent>
      <Dialog onClose={onCloseConfirm} open={open}>
        <DialogContent>
          <Typography>Are you sure</Typography>
          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onCloseConfirm}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
