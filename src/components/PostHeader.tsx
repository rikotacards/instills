import { MoreHoriz } from "@mui/icons-material";
import { Box, Avatar, Typography, IconButton, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUser } from "../firebase/profile";
import { useNavigate } from "react-router";
interface PostHeaderProps {
  dateAdded: string;
  onDialogOpen: () => void;
  profile: string;
  isYourPost: boolean;
  total: number;
  curr: number;
  uid: string;
  username?: string;
  profileUrl?: string;
  isLoading?: boolean;
}
export const PostHeader: React.FC<PostHeaderProps> = ({
  dateAdded,
  onDialogOpen,
  isYourPost,
  curr,
  total,
  isLoading, 
  profileUrl,
  username
}) => {
  const nav = useNavigate();
  const goToProfile = (username: string) => {
    nav(`/${username}`);
  };

  const avatar = isLoading ? (
    <Skeleton sx={{ height: 30, width: 30, mr: 1 }} variant="circular" />
  ) : (
    <Avatar sx={{ height: 30, width: 30, mr: 1 }} src={profileUrl} />
  );

  return (
    <Box display={"flex"} sx={{ color: "white", alignItems: "center" }}>
      {avatar}
      <Typography
        onClick={
          username?.length ? () => goToProfile(username) : undefined
        }
        variant="body2"
        fontWeight={700}
        sx={{ color: "white", cursor: 'pointer' }}
      >
        {username}
      </Typography>
      <Typography
        variant="caption"
        fontWeight={300}
        sx={{ color: "white", ml: 1 }}
      >
        {dateAdded}
      </Typography>
      <Typography variant="caption" fontWeight={300} sx={{ ml: 1 }}>
        ({curr}/{total})
      </Typography>

      <Box sx={{ ml: "auto" }}>
        {
          <IconButton
            onClick={onDialogOpen}
            color="inherit"
          >
            <MoreHoriz />
          </IconButton>
        }
      </Box>
    </Box>
  );
};
