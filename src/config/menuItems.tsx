import { IMenuItems } from "../types"
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";

export const sidebar: IMenuItems[] = [
    {
      icon: <HomeIcon />,
      label: "home",
      path: "/",
    },
    {
      icon: <AddIcon />,
      label: "create",
      path: "/create",
    },
    {
      icon: <Avatar sx={{ height: 25, width: 25 }} />,
      label: "profile",
      path: "/profile/maxwelldhsu",
    },
  ];