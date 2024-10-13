import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  ListItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
const fields = ["name", "username", "bio"];
interface EditProfilePageProps {
  onClose: () => void;
}
interface EditNameProps {
  onClose: () => void;
}
const EditName: React.FC<EditNameProps> = ({ onClose }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar>
        <Typography fontWeight={"bold"}>Name</Typography>
        <Button sx={{ ml: "auto" }} onClick={onClose}>
          Done
        </Button>
      </Toolbar>
      <DialogContent>
        <TextField placeholder="Name" fullWidth />
      </DialogContent>
    </Box>
  );
};

const EditUsername: React.FC<EditNameProps> = ({ onClose }) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Toolbar>
          <Typography fontWeight={"bold"}>Username</Typography>
          <Button sx={{ ml: "auto" }} onClick={onClose}>
            Done
          </Button>
        </Toolbar>
        <DialogContent>
          <TextField placeholder="Username" fullWidth />
        </DialogContent>
      </Box>
    );
  };
  const EditBio: React.FC<EditNameProps> = ({ onClose }) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Toolbar>
          <Typography fontWeight={"bold"}>Bio</Typography>
          <Button sx={{ ml: "auto" }} onClick={onClose}>
            Done
          </Button>
        </Toolbar>
        <DialogContent>
          <TextField multiline minRows={4} placeholder="Write something" fullWidth />
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
        <Box sx={{ display: "flex", flex: 1 }}>
          <Typography>{f}</Typography>
        </Box>
        <ListItem
          onClick={() => onEditField(f)}
          sx={{textTransform: "capitalize", display: "flex", flex: 2 }}
          divider
        >
          <Typography sx={{textTransform: 'capitalize'}}>{f}</Typography>
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
      </Box>
      <DialogContent>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Avatar sx={{mr:1}}/>
          <Button fullWidth>Edit picture</Button>
        </Box>
        {renderedFields}
      </DialogContent>
      <Dialog fullScreen={isNarrow} open={open} onClose={onDClose}>
        {editField === "name" && <EditName onClose={onDClose} />}
        {editField === 'username' && <EditUsername onClose={onDClose}/>}
        {editField === 'bio' && <EditBio onClose={onDClose}/>}

      </Dialog>
    </>
  );
};
