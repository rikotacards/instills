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
const fields = [
  { fieldName: "name", placeholder: "name" },
  { fieldName: "username", placeholder: "username" },
  { fieldName: "bio", placeholder: "Write something about yourself" },
];
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../firebase/posts";
import { EditUsernameTextBox } from "../components/EditUsername";

interface EditProfilePageProps {
  onClose: () => void;
  uid: string;
}
interface EditNameProps {
  onClose: () => void;
  value?: string;
  uid: string;
}
const EditName: React.FC<EditNameProps> = ({ uid, value, onClose }) => {
  const [name, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getUser"],
      }),
    mutationFn: (args: { uid: string; name: string }) => {
      return updateProfile({
        name: args.name,
        uid: args.uid,
      });
    },
  });
  const onDone = async () => {
    mutation.mutate({ uid, name });
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
        <TextField
          value={name}
          onChange={onChange}
          placeholder="Name"
          fullWidth
        />
      </DialogContent>
    </Box>
  );
};

const EditUsername: React.FC<EditNameProps> = ({ uid, onClose, value }) => {
  const [username, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toLowerCase());
  };
  const onDone = async () => {
    
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
        <EditUsernameTextBox currUsername={value} username={username} uid={uid} />
      </DialogContent>
    </Box>
  );
};
const EditBio: React.FC<EditNameProps> = ({ uid, onClose, value }) => {
  const [bio, setName] = React.useState(value || "");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getUser"],
      }),
    mutationFn: (args: { bio: string; uid: string }) => {
      return updateProfile({
        bio: args.bio,
        uid: args.uid,
      });
    },
  });
  const onDone = async () => {
    mutation.mutate({ uid, bio });
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
          value={bio}
        />
      </DialogContent>
    </Box>
  );
};

export const EditProfilePage: React.FC<EditProfilePageProps> = ({
  onClose,
  uid,
}) => {
  const isNarrow = useIsNarrow();
  const [open, setOpen] = React.useState(false);
  const [editField, setEditField] = React.useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", uid || UID],
    queryFn: () => getUser(uid || UID),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getUser"],
      }),
    mutationFn: (args: { profilePhotoUrl: string; uid: string }) => {
      return updateProfile({
       profilePhotoUrl: args.profilePhotoUrl,
        uid: args.uid,
      });
    },
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
  const [imagePath, setImagePath] = React.useState<undefined | string>(
    data?.profilePhotoUrl
  );
  const ref = React.useRef<null | HTMLInputElement>(null);
  const onImageFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0 || !e.target?.files) {
      // if you cancel when choosing photos
      return;
    } else {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePath(imageUrl);
     const profilePhotoUrl = await uploadFile({file: e.target.files[0], postId: 'profilePhoto', path:'profile'})
      await mutation.mutate({uid, profilePhotoUrl})
    }
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
          <Typography
            color="textSecondary"
            sx={{ textTransform: "capitalize" }}
          >
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
          <Avatar src={imagePath} sx={{ mr: 1 }} />
          <Button onClick={() => ref?.current?.click()} fullWidth>Edit picture</Button>
          <input
            onChange={(e) => onImageFileChange(e)}
            accept="image/*"
            type="file"
            ref={ref}
            style={{ display: "none" }}
          />
        </Box>
        {renderedFields}
      </DialogContent>
      <Dialog fullScreen={isNarrow} open={open} onClose={onDClose}>
        {editField === "name" && (
          <EditName uid={uid} value={data?.name} onClose={onDClose} />
        )}
        {editField === "username" && (
          <EditUsername uid={uid} value={data?.username} onClose={onDClose} />
        )}
        {editField === "bio" && (
          <EditBio uid={uid} value={data?.bio} onClose={onDClose} />
        )}
      </Dialog>
    </>
  );
};
