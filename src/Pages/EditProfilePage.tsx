import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  ListItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
import { getUser, updateProfile } from "../firebase/profile";
import { UID } from "../firebase/firebaseConfig";
const fields = [{fieldName: "name", placeholder: 'name'}, {fieldName:"username", placeholder: 'username'}, {fieldName: 'bio', placeholder: 'Write something about yourself'}];
import { useQuery } from "@tanstack/react-query";

interface EditProfilePageProps {
  onClose: () => void;
}
interface EditNameProps {
  onClose: () => void;
  value?: string;
}
const EditName: React.FC<EditNameProps> = ({ value, onClose }) => {
  const [name, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onDone = async () => {
    await updateProfile({
      name,
      uid: UID,
    });
    onClose();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar>
        <Typography fontWeight={"bold"}>Name</Typography>
        <Button onClick={onDone} sx={{ ml: "auto" }}>
          Done
        </Button>
      </Toolbar>
      <DialogContent>
        <TextField onChange={onChange} placeholder="Name" fullWidth />
      </DialogContent>
    </Box>
  );
};

const EditUsername: React.FC<EditNameProps> = ({ onClose, value }) => {
  const [username, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toLowerCase());
  };
  const onDone = async () => {
    await updateProfile({
      username,
      uid: UID,
    });
    onClose();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar>
        <Typography fontWeight={"bold"}>Username</Typography>
        <Button sx={{ ml: "auto" }} onClick={onDone}>
          Done
        </Button>
      </Toolbar>
      <DialogContent>
        <TextField
          value={username}
          onChange={onChange}
          placeholder="Username"
          fullWidth
        />
      </DialogContent>
    </Box>
  );
};
const EditBio: React.FC<EditNameProps> = ({ onClose, value }) => {
  const [bio, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toLowerCase());
  };
  const onDone = async () => {
    await updateProfile({
      bio,
      uid: UID,
    });
    onClose();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar>
        <Typography fontWeight={"bold"}>Bio</Typography>
        <Button sx={{ ml: "auto" }} onClick={onDone}>
          Done
        </Button>
      </Toolbar>
      <DialogContent>
        <TextField
          onChange={onChange}
          multiline
          minRows={4}
          placeholder="Write something"
          fullWidth
          value={bio || "Write something"}
        />
      </DialogContent>
    </Box>
  );
};

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  onClose,
}) => {
  const isNarrow = useIsNarrow();
  const [open, setOpen] = React.useState(false);
  const [editField, setEditField] = React.useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", UID],
    queryFn: () => getUser(UID),
  });
  const onOpen = () => {
    setOpen(true);
  };
  const onDClose = () => {
    setOpen(false);
  };
  const onEditField = (field: string) => {
    setEditField(field);
    onOpen();
  };
  const renderedFields = fields.map((f) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box sx={{ display: "flex", flex: 1, textTransform: "capitalize" }}>
          <Typography>{f.fieldName}</Typography>
        </Box>
        <ListItem
          onClick={() => onEditField(f.fieldName)}
          sx={{ textTransform: "capitalize", display: "flex", flex: 2 }}
          divider
        >
          <Typography color='textSecondary' sx={{ textTransform: "capitalize" }}>
            {data?.[f.fieldName] || f.placeholder}
            </Typography>
        </ListItem>
      </Box>
    );
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Toolbar>
          <Typography fontWeight={"bold"}>Edit Profile</Typography>
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
        {isLoading && <LinearProgress sx={{ width: "100%" }} />}
      </Box>
      <DialogContent>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Avatar sx={{ mr: 1 }} />
          <Button fullWidth>Edit picture</Button>
        </Box>
        {renderedFields}
      </DialogContent>
      <Dialog fullScreen={isNarrow} open={open} onClose={onDClose}>
        {editField === "name" && (
          <EditName value={data?.name} onClose={onDClose} />
        )}
        {editField === "username" && (
          <EditUsername value={data?.username} onClose={onDClose} />
        )}
        {editField === "bio" && (
          <EditBio value={data?.bio} onClose={onDClose} />
        )}
      </Dialog>
    </>
  );
};
