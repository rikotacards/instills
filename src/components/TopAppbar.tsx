import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Box,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useScrollDirection } from "../utils/useScrollDirection";

import MenuItem from "@mui/material/MenuItem";
import { SideDrawer } from "./SideDrawer";
import { sidebar } from "../config/menuItems";

interface TopAppbarProps {
  onOpen: () => void;
}
export const TopAppbar: React.FC<TopAppbarProps> = ({ onOpen }) => {
  const isNarrow = useIsNarrow();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nav = useNavigate();
  const sd = useScrollDirection();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: sd === "up" ? "55px" : 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: "height 0.5s ease",
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              borderRadius: 4,
              pl: 1,
              pr: 1,
              color: sd === "up" ? "black" : "transparent",
            }}
            color="textPrimary"
            fontWeight={"bold"}
            variant="h6"
            noWrap
            component="div"
          >
            Stills
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton
              sx={{ backdropFilter: "blur(1px)" }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer onOpen={onOpen} isNarrow={isNarrow} />

      <Toolbar />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {sidebar.map((item) => (
          <MenuItem
            key={item.label}
            onClick={item.label === "create" ? onOpen : () => nav(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText sx={{textTransform: 'capitalize'}} primary={item.label}/>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
