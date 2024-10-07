import { MoreVert } from "@mui/icons-material";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
interface PostTopProps {
  onMoreClick: () => void
}
export const PostTop: React.FC<PostTopProps> = ({onMoreClick}) => {
  return (
    <Box sx={{width:'100%', display: 'flex', p:1, alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>

      <Avatar sx={{
        mr:1,
        height:30,
        width:30
      }} />
      <Box>
        <Typography sx={{color: 'white'}} variant='caption'>Maxwelldhsu</Typography>
      </Box>
      </Box>
      <IconButton onClick={onMoreClick} sx={{ ml: "auto" }}>
        <MoreVert />
      </IconButton>
    </Box>
  );
};
