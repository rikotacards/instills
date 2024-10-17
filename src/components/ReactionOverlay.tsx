import { Favorite } from "@mui/icons-material";
import { Box, Zoom, IconButton } from "@mui/material";
import React from "react";
interface ReactionOverlayProps {
  openReaction: boolean;
}
export const ReactionOverlay: React.FC<ReactionOverlayProps> = ({
  openReaction,
}) => {

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        zIndex: 3,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        visibility: openReaction ? 'visible' : 'hidden'
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton>
          <Favorite
            sx={{
              transition: "transform 0.3s ease",
              transform: openReaction ? "scale(3)" : "scale(0)",
            }}
            color="error"
          />
        </IconButton>
      </Box>
    </Box>
  );
};
