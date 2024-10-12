import { MoreVert } from "@mui/icons-material";
import profile from '../assets/profile.jpeg'
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
interface PostTopProps {
  onMoreClick: () => void
}
export const PostTop: React.FC<PostTopProps> = ({onMoreClick}) => {
  return (
    <Box sx={{width:'100%', display: 'flex', p:2, alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>

      <Avatar src={profile} sx={{
        mr:1,
        height:35,
        width:35
      }} />
      <Box>
        <Typography fontWeight={700} sx={{color: 'white', textShadow: '0px 0px 15px black'}} variant='body2'>Maxwelldhsu</Typography>
      </Box>
      </Box>
      <IconButton onClick={onMoreClick} sx={{ ml: "auto" }}>
        <MoreVert />
      </IconButton>
    </Box>
  );
};
