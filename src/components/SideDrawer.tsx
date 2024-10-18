import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { sidebar } from "../config/menuItems";
import { useAuthContext } from "../providers/useContexts";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../firebase/profile";

const drawerWidth = 200;
interface SideDrawerProps {
  isNarrow: boolean;
  onOpen: () => void;
}
export const SideDrawer: React.FC<SideDrawerProps> = ({ isNarrow, onOpen }) => {
  const nav = useNavigate();
  const {user} = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", user?.uid],
    queryFn: () => getUser(user?.uid || ""),
  });
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isNarrow ? 0 : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isNarrow ? 0 : drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.5s",
          borderColor: isNarrow ? "transparent" : undefined,
          zIndex: 0,
        },
        transition: "width 0.5s",
      }}
    >
      <Toolbar />
      <List sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {sidebar.map((s) => {
          return (
            <MenuItem
              key={s.path}
              onClick={s.label === "create" ? onOpen : () => nav(s.path)}
            >
              {s.icon && <ListItemIcon>{s.icon}</ListItemIcon>}
              <ListItemText
                sx={{ textTransform: "capitalize", textAlign: "left" }}
                primary={s.label}
              />
            </MenuItem>
          );
        })}
        <Box sx={{ mt: "auto" }}>
        <MenuItem onClick={() => nav(`/${data?.username}`)}>
           <ListItemIcon> <Avatar sx={{ height: 25, width: 25 }} /></ListItemIcon>
           <ListItemText primary='Profile'/>
           </MenuItem>
          <MenuItem>
            <ListItemText primary="Log out" />
          </MenuItem>
        </Box>
      </List>
    </Drawer>
  );
};
