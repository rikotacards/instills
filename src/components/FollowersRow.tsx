import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { getUser } from "../firebase/profile";
import { useQuery } from "@tanstack/react-query";

interface FollowersRowProps {
  uid: string;
}
export const FollowersRow: React.FC<FollowersRowProps> = ({ uid }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserFollower"],
    queryFn: () => getUser(uid || ""),
  });
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={data?.profilePhotoUrl} />
      </ListItemAvatar>
      <ListItemText primary={data?.username} secondary={data?.name} />
    </ListItem>
  );
};
