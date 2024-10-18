import {
  Box,
  Button,
  Card,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  addUsername,
  checkUsernameExists,
  editUsername,
  updateProfile,
} from "../firebase/profile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAuthContext } from "../providers/useContexts";
import { useNavigate } from "react-router";
import { ErrorOutlined } from "@mui/icons-material";

interface EditUsernameProps {
  username: string;
  uid: string;
  currUsername: string;
}
export const EditUsernameTextBox: React.FC<EditUsernameProps> = ({
  uid,
  username,
  currUsername
}) => {
  const [newUsername, setNewUsername] = React.useState(username || "");
  const [isLoading, setLoading] = React.useState(false);
  const onLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };

  const [exists, setExists] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const onSuccess = () => {
    setSuccess(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value.toLowerCase());
  };
  const onDone = async () => {
    try {
      setSuccess(false);
      onLoading();
      const res = await checkUsernameExists(newUsername);
      console.log("res", res);
      if (res) {
        setExists(true);
      } else {
        await editUsername(newUsername, uid, currUsername);
        onSuccess();
        setExists(false);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "column", mb: 1 }}>
      <Box>
        <TextField
          fullWidth
          color={exists ? "error" : undefined}
          onChange={onChange}
          value={newUsername}
          slotProps={{
            input: {
              endAdornment: isSuccess ? (
                <InputAdornment position="end">
                  <CheckCircleOutlineIcon color="success" />
                </InputAdornment>
              ) : exists ? (
                <ErrorOutlined color="error" />
              ) : null,
            },
          }}
        />
      </Box>
      {exists && (
        <Typography variant="caption" color="error">
          Username exists
        </Typography>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" onClick={onDone}>
          Done
        </Button>
      )}
    </Box>
  );
};
