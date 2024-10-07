import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useIsNarrow } from "../utils/useIsNarrow";
interface LayoutProps {
  children: React.ReactNode;
}
const sidebar = [
  {
    icon: null,
    label: "home",
    path: "/",
  },
  {
    icon: null,
    label: "create",
    path: "/create",
  },
];
const drawerWidth = 240;
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const nav = useNavigate();
  const isNarrow = useIsNarrow();
  return (
    <Box display={"flex"}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Stills
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isNarrow ? 0 : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isNarrow ? 0 : drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.5s",
          },
          transition: "width 0.5s",
        }}
      >
        <Toolbar />
        <List>
          {sidebar.map((s) => {
            return (
              <ListItem key={s.path} onClick={() => nav(s.path)}>
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={s.label}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
