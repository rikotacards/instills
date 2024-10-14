import { Drawer, List, ListItemIcon, ListItemText, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { sidebar } from '../config/menuItems';
const drawerWidth = 100;
interface SideDrawerProps {
    isNarrow: boolean;
    onOpen: () => void;
}
export const SideDrawer: React.FC<SideDrawerProps> = ({
    isNarrow, 
    onOpen
}) => {
    const nav = useNavigate();
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
            borderColor: "transparent",
            zIndex: 0,
          },
          transition: "width 0.5s",
        }}
      >
        <Toolbar />
        <List>
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
        </List>
      </Drawer>
    )
}