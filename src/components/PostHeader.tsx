import { MoreHoriz } from "@mui/icons-material";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import React from "react";
interface PostHeaderProps {
  dateAdded: string;
  onDialogOpen: () => void;
  profile: string;
}
export const PostHeader: React.FC<PostHeaderProps> = ({
  dateAdded,
  onDialogOpen,
  profile,
}) => {
  return (
    <Box display={"flex"} sx={{ color: "white", alignItems: "center" }}>
      <Avatar sx={{ height: 30, width: 30, mr: 1 }} src={profile} />
      <Typography variant="body2" fontWeight={700} sx={{ color: "white" }}>
        Maxwelldhsu
      </Typography>
      <Typography
        variant="caption"
        fontWeight={300}
        sx={{ color: "white", ml: 1 }}
      >
        {dateAdded}
      </Typography>
      <Box sx={{ ml: "auto" }}>
        <IconButton onClick={onDialogOpen} color="inherit">
          <MoreHoriz />
        </IconButton>
      </Box>
    </Box>
  );
};
