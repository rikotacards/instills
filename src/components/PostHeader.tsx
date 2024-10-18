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
}
export const PostHeader: React.FC<PostHeaderProps> = ({
  dateAdded,
  onDialogOpen,
  isYourPost,
  curr,
  total,
  uid,
}) => {
  const nav = useNavigate();
  const goToProfile = (username: string) => {
    nav(`/${username}`);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getUserForPost", uid],
    queryFn: () => getUser(uid || ""),
  });
  const avatar = isLoading ? (
    <Skeleton sx={{ height: 30, width: 30, mr: 1 }} variant="circular" />
  ) : (
    <Avatar sx={{ height: 30, width: 30, mr: 1 }} src={data?.profilePhotoUrl} />
  );

  return (
    <Box display={"flex"} sx={{ color: "white", alignItems: "center" }}>
      {avatar}
      <Typography
        onClick={
          data?.username?.length ? () => goToProfile(data.username) : undefined
        }
        variant="body2"
        fontWeight={700}
        sx={{ color: "white", cursor: 'pointer' }}
      >
        {data?.username}
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
            onClick={isYourPost ? onDialogOpen : undefined}
            color="inherit"
          >
            <MoreHoriz />
          </IconButton>
        }
      </Box>
    </Box>
  );
};
