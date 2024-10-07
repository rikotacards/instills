import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ImageGallery } from "../components/ImageGallery";
import { useIsNarrow } from "../utils/useIsNarrow";
import { Timeline } from "../components/Timeline";

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
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar sx={{ mr: 1, height: 100, width: 100 }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography fontWeight={"bold"}>Maxwell Hsu</Typography>
          <Typography>I made web things</Typography>
        </Box>
      </Box>

      <Button onClick={onEdit}>Edit</Button>
      {isNarrow ? <Timeline/> : <ImageGallery/>}
    </Box>
  );
};
