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
  updateProfile,
} from "../firebase/profile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAuthContext } from "../providers/useContexts";
import { useNavigate } from "react-router";
import { ErrorOutlined } from "@mui/icons-material";

interface CreateUsernameProps {
  onNext: () => void;
}
export const CreateUsername: React.FC<CreateUsernameProps> = ({ onNext }) => {
  const [newUsername, setNewUsername] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const nav = useNavigate();

  const onLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };
  const { user } = useAuthContext();
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
      if (res == true) {
        setExists(true);
      } else {
        if (user?.uid) {
          await addUsername(newUsername, user.uid, user?.displayName);
          onSuccess();
          setExists(false);
        }
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{ p: 1, display: "flex", flexDirection: "column", mb: 1 }}
    >
      <Typography fontWeight={"bold"}>Create your username</Typography>
      <Typography sx={{ mb: 1 }} color="textSecondary" variant="caption">
        Don't worry, you'll be able to chage it later.
      </Typography>
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
        <Button
          disabled={isSuccess}
          sx={{ mt: 1 }}
          variant="contained"
          onClick={onDone}
        >
          Done
        </Button>
      )}

      <Box sx={{ mt: 1 }}>
        <Button
          disabled={!isSuccess}
          onClick={onNext}
          fullWidth
          variant="contained"
        >
          Next
        </Button>
      </Box>
    </Card>
  );
};
