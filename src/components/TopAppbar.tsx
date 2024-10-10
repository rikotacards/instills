import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Menu, IconButton, Box, ListItemIcon, Avatar } from '@mui/material';
import React from 'react';
import { useIsNarrow } from '../utils/useIsNarrow';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
const drawerWidth = 240;
import AddIcon from '@mui/icons-material/Add';
const sidebar = [
    {
      icon: <HomeIcon/>,
      label: "home",
      path: "/",
    },
    {
      icon: <AddIcon/>,
      label: "create",
      path: "/create",
      
    },
    {
        icon: <Avatar sx={{height:25, width:25}}/>,
        label: "profile",
        path: "/profile",
        
      },
  ];
  interface TopAppbarProps {
    onOpen: () => void;
  }
export const TopAppbar: React.FC<TopAppbarProps> = ({onOpen}) => {
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

    return (
        <>
        <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }}
      >
        <Toolbar>
          <Typography fontWeight={'bold'} variant="h6" noWrap component="div">
            Stills
          </Typography>
          <Box sx={{ml: 'auto'}}>
        <IconButton onClick={handleClick}>
            <MenuIcon/>
        </IconButton>
      </Box>
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
            borderColor: 'transparent',
            zIndex: 0,
          },
          transition: "width 0.5s",
        }}
      >
        
        <Toolbar />
        <List>
          {sidebar.map((s) => {
            return (
              <MenuItem key={s.path} onClick={s.label ==='create'? onOpen : () => nav(s.path)}>
               {s.icon && <ListItemIcon>{s.icon}</ListItemIcon> }
                <ListItemText
                  sx={{ textTransform: "capitalize", textAlign: 'left' }}
                  primary={s.label}
                />
              </MenuItem>
            );
          })}
        </List>
      </Drawer>
      
      <Toolbar />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {sidebar.map((item) => <MenuItem key={item.label} onClick={item.label === 'create' ? onOpen : () => nav(item.path)}>{item.label}</MenuItem>)}
       
      </Menu>
      </>
    )
}