import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { getUser } from "../firebase/profile";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface FollowersRowProps {
  uid: string;
  onClose: () => void;
}
export const FollowersRow: React.FC<FollowersRowProps> = ({ uid, onClose }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserFollower"],
    queryFn: () => getUser(uid || ""),
  });
  const nav = useNavigate();
  const goToProfile = () => {
    nav(`/${data?.username}`);
    onClose();
  };
  return (
    <ListItemButton disableGutters>
      <ListItem onClick={goToProfile}>
        <ListItemAvatar>
          <Avatar src={data?.profilePhotoUrl} />
        </ListItemAvatar>
        <ListItemText primary={data?.username} secondary={data?.name} />
      </ListItem>
    </ListItemButton>
  );
};
