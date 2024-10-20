import React from "react";
import { IUser } from "../types";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";

export const SearchUsers: React.FC<IUser> = (props) => {
  const nav = useNavigate();
  const goToProfile = () => nav(`/${props.username}`);
  return (
    <ListItemButton disableGutters>
      <ListItem onClick={goToProfile}>
        <ListItemAvatar>
          <Avatar src={props?.profilePhotoUrl} />
        </ListItemAvatar>
        <ListItemText primary={props?.username} secondary={props?.name} />
      </ListItem>
    </ListItemButton>
  );
};
