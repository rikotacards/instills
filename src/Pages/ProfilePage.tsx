import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ImageGallery } from "../components/ImageGallery";
import { useIsNarrow } from "../utils/useIsNarrow";
import { Timeline } from "../components/Timeline";
import profile from "../assets/profile.jpeg";
export const ProfilePage: React.FC = () => {
  const nav = useNavigate();
  const isNarrow = useIsNarrow();
  const onEdit = () => nav("edit");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar src={profile} sx={{ mr: 1, height: 100, width: 100 }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography fontWeight={"bold"}>Maxwell Hsu</Typography>
          <Typography variant="body2">
            I made web things, travel a bit much, and strongly prefer menus with
            pictures.
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:'100%'}}>
        <Box>
          <Typography>3 posts</Typography>
        </Box>
        <Box>
          <Typography>0 followers</Typography>
        </Box>
        <Box>
          <Typography>0 following</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button fullWidth onClick={onEdit}>
          Edit
        </Button>
        <Button fullWidth onClick={onEdit}>
          Follow
        </Button>
      </Box>
      {isNarrow ? <Timeline /> : <ImageGallery />}
    </Box>
  );
};
