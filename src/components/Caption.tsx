import { Box, Typography } from "@mui/material";
import React from "react";
interface CaptionProps {
  text: string;
  isCaptionOpen: boolean;
  onToggle: () => void;
}
export const Caption: React.FC<CaptionProps> = ({onToggle, isCaptionOpen, text }) => {
  const open = isCaptionOpen
  return (
    <Box
      sx={{
        zIndex:3,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow:open ? 'scroll' :  "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: open ? "unset" : 2,
        transition: "max-height 0.5s ease",
        height: "auto",
        lineHeight: "1.5em",
        textAlign: 'left',
        m:0,
        maxHeight: open ? "200px" : 'calc(2 * 1.5em)',
      }}
      onClick={onToggle}
    >
      <Typography 
      fontWeight={500}
      sx={{color: 'white'}}
      variant='body2'>{text}</Typography>
    </Box>
  );
};
