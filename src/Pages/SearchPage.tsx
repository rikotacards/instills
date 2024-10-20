import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { getUid, getUser } from "../firebase/profile";
import { useQuery } from "@tanstack/react-query";
import { SearchUsers } from "./SearchUsers";

export const SearchPage: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [isSearchFocused, setSearchFocus] = React.useState(false);
  const [user, setUser] = React.useState();
  const [isLoading, setLoading] = React.useState(false);

  const onSearch = async () => {
    setLoading(true);
    setUser();
    try {
      const uid = await getUid(username);
      if (!uid) {
        setLoading(false);
        return;
      }
      const user = await getUser(uid.uid);
      if (user) {
        setUser(user);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const onToggleFocus = () => {
    setSearchFocus(!isSearchFocused);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
  };
  //   const { data: uidData, isLoading: uidLoading } = useQuery({
  //     queryKey: ["getUidSearch", username],
  //     queryFn: () => getUid(username),
  //   });
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getUserSearch"],
  //     queryFn: () => getUser(uidData?.uid || ""),
  //   });
  const onCancel = () => {
    setUsername("");
    onToggleFocus();
  };
  return (
    <Box sx={{ m: 1 }}>
      <TextField
        onFocus={() => setSearchFocus(true)}
        fullWidth
        placeholder="Search user"
        onChange={onChange}
        value={username}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{ textTransform: "capitalize", mr: 1 }}
                  onClick={onSearch}
                  disabled={username.length <= 0}
                >
                  Search
                </Button>
                {isSearchFocused && (
                  <Button onClick={onCancel}>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      color="textSecondary"
                    >
                      Cancel
                    </Typography>
                  </Button>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      {isSearchFocused && isLoading && <CircularProgress />}
      {isSearchFocused && user ? <SearchUsers {...user} /> : null}
    </Box>
  );
};
