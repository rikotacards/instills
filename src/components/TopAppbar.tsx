import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Box,
  ListItemIcon,
  ListItemText,
  Slide,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import React from "react";
import { useIsNarrow } from "../utils/useIsNarrow";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useScrollDirection } from "../utils/useScrollDirection";

import MenuItem from "@mui/material/MenuItem";
import { sidebar } from "../config/menuItems";
import { useAuthContext } from "../providers/useContexts";
import { onSignInWithGoogle } from "../hooks/useSignIn";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../firebase/profile";
import { useDetectColorTheme } from "../hooks/useDetectColorTheme";
interface TopAppbarProps {
  onOpen: () => void;
}
export const TopAppbar: React.FC<TopAppbarProps> = ({ onOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { theme } = useDetectColorTheme();
  const { user } = useAuthContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", user?.uid],
    queryFn: () => getUser(user?.uid || ""),
  });
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSignIn = async () => {
    handleClose();
    await onSignInWithGoogle();
  };
  const onSignOut = () => {
    handleClose();
    signOut(auth).then(() => {
      nav("/");
    });
  };
  const nav = useNavigate();
  const sd = useScrollDirection();
  const displayedButton = user ? (
    <Box sx={{ ml: "auto" }}>
      <IconButton sx={{ backdropFilter: "blur(1px)" }} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
    </Box>
  ) : (
    <Button
      onClick={onSignIn}
      variant="contained"
      sx={{ ml: "auto", textTransform: "capitalize" }}
    >
      Login
    </Button>
  );
  return (
    <Slide in={sd == "up"}>
      <AppBar
        elevation={0}
        sx={{
          transition: "height 0.5s ease",
        }}
      >
        <Toolbar sx={{ height: 0 }}>
          <Typography
            sx={{
              borderRadius: 4,
              pl: 1,
              pr: 1,
            }}
            color="textPrimary"
            fontWeight={"bold"}
            variant="h6"
            noWrap
            component="div"
          >
            Stills
          </Typography>
          {displayedButton}
        </Toolbar>
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
              onClick={
                item.label === "create"
                  ? onOpen
                  : () => {
                      nav(item.path);
                      handleClose();
                    }
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={item.label}
              />
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              nav(`/${data?.username}`);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Avatar
                src={data?.profilePhotoUrl}
                sx={{ height: 25, width: 25 }}
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={onSignOut}>
            <ListItemText primary="Log out" />
          </MenuItem>
        </Menu>
        <Divider />
      </AppBar>
    </Slide>
  );
};
