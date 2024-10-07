import { Avatar, Box, Button, OutlinedInput, Typography } from "@mui/material";
import React from "react";

export const ProfileSettingsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        Edit Profile
      </Typography>
      <Box sx={{ textAlign: "left", width: "100%" , display: 'flex', alignItems: 'center'}}>
       <Avatar/>
        <Button>Change Photo</Button>
      </Box>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography fontWeight={"bold"}>Username</Typography>
        <OutlinedInput fullWidth  />
      </Box>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography fontWeight={"bold"}>Bio</Typography>
        <OutlinedInput fullWidth minRows={2} multiline />
      </Box>
    </Box>
  );
};
